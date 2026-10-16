import { useState } from 'react';
import { DocumentActionProps, DocumentActionDescription } from 'sanity';

export function GenerateCaseStudyAction(props: DocumentActionProps): DocumentActionDescription | null {
  const [isProcessing, setIsProcessing] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');

  if (props.type !== 'sourceDocument') {
    return null;
  }

  const doc = (props.draft || props.published) as {
    _id: string;
    title?: string;
    rawContent?: string;
    confidentialityAcknowledged?: boolean;
    confidentialityStatus?: string;
    projectTitleHint?: string;
    relatedOrganization?: string;
  } | null;

  if (!doc) return null;

  const isAcknowledged = Boolean(doc.confidentialityAcknowledged);
  const isConfidential = doc.confidentialityStatus === 'confidential_do_not_process';
  const hasContent = Boolean(doc.rawContent && doc.rawContent.trim().length > 0);

  return {
    label: isProcessing ? 'Generating Case Study...' : 'Generate Case-Study Draft',
    title: !isAcknowledged
      ? 'Acknowledge confidentiality to enable generation'
      : isConfidential
      ? 'Confidential sources cannot be processed by policy'
      : !hasContent
      ? 'Enter raw text or upload markdown before generating'
      : 'Generate structured case-study draft and architecture graph',
    disabled: isProcessing || !isAcknowledged || isConfidential || !hasContent,
    onHandle: async () => {
      setIsProcessing(true);
      try {
        let editorialSecret = typeof window !== 'undefined' ? localStorage.getItem('mhb_editorial_secret') || '' : '';

        const makeRequest = async (secret: string) => {
          const headers: Record<string, string> = {
            'Content-Type': 'application/json',
          };
          if (secret) {
            headers['Authorization'] = `Bearer ${secret}`;
            headers['x-editorial-secret'] = secret;
          }

          return fetch('/api/ai/generate', {
            method: 'POST',
            headers,
            body: JSON.stringify({
              sourceDocumentId: props.id.replace(/^drafts\./, ''),
              sourceContent: doc.rawContent,
              projectTitleHint: doc.projectTitleHint || doc.title,
              relatedOrganization: doc.relatedOrganization,
              confidentialityStatus: doc.confidentialityStatus || 'anonymized',
              confidentialityAcknowledged: doc.confidentialityAcknowledged,
            }),
          });
        };

        let response = await makeRequest(editorialSecret);

        // If 401 Unauthorized, prompt the editor for the secret
        if (response.status === 401 && typeof window !== 'undefined') {
          const promptedSecret = window.prompt(
            'Editorial Authentication Required\n\nPlease enter the SANITY_PREVIEW_SECRET or CASE_STUDY_EDITORIAL_SECRET configured on the server:'
          );
          if (promptedSecret && promptedSecret.trim().length > 0) {
            editorialSecret = promptedSecret.trim();
            localStorage.setItem('mhb_editorial_secret', editorialSecret);
            response = await makeRequest(editorialSecret);
          }
        }

        const result = await response.json();

        if (!response.ok || !result.success) {
          setDialogMessage(`Generation failed: ${result.message || result.error || 'Unknown error'}`);
          setDialogOpen(true);
        } else {
          const draftId = result.data?.targetCaseStudyDraftId || '';
          setDialogMessage(
            `Case study draft successfully prepared!\n\nTarget Draft ID: ${draftId}\nStatus: ${result.data?.status}\nWarnings: ${result.data?.warnings?.length || 0}\n\nYou can now open the draft in Sanity under "Generated Case Study Drafts" for human review and manual publication.`
          );
          setDialogOpen(true);
        }
      } catch (err) {
        setDialogMessage(`Generation failed: ${(err as Error).message}`);
        setDialogOpen(true);
      } finally {
        setIsProcessing(false);
      }
    },
    dialog: dialogOpen && {
      type: 'dialog',
      onClose: () => setDialogOpen(false),
      header: 'AI Case-Study Generation',
      content: dialogMessage,
    },
  };
}
