import { PRDOutput, UserStoriesOutput, AcceptanceCriteriaOutput } from '../ai/types';

export class ExportService {
  /**
   * Generates formatted text output for Markdown, Jira, Linear, Confluence, or JSON.
   */
  static generateTextExport(
    title: string,
    type: 'PRD' | 'UserStory' | 'AcceptanceCriteria',
    content: PRDOutput | UserStoriesOutput | AcceptanceCriteriaOutput,
    format: 'markdown' | 'jira' | 'linear' | 'confluence' | 'json'
  ): string {
    if (format === 'json') {
      return JSON.stringify({ title, type, content }, null, 2);
    }

    if (type === 'PRD') {
      const prd = content as PRDOutput;
      if (format === 'jira') {
        return `h1. ${title} - Product Requirements Document

h2. 1. Product Overview
${prd.productOverview}

h2. 2. Problem Statement
${prd.problemStatement}

h2. 3. Business Goals
${prd.businessGoals.map((bg) => `* ${bg}`).join('\n')}

h2. 4. Target User Personas
${prd.userPersonas.map((p) => `* *${p.name}* (${p.role}): Pain Points: ${p.painPoints.join(', ')}`).join('\n')}

h2. 5. End-to-End User Journey
${prd.userJourney.map((step, i) => `${i + 1}. ${step}`).join('\n')}

h2. 6. Functional Requirements & RICE Scores
${prd.functionalRequirements.map((fr) => `* *[${fr.id}]* (${fr.priority}) *${fr.title}*: ${fr.description} ${fr.rice ? `(RICE Score: ${fr.rice.score})` : ''}`).join('\n')}

h2. 7. Non-Functional Requirements
${prd.nonFunctionalRequirements.map((nfr) => `* ${nfr}`).join('\n')}

h2. 8. User Stories
${prd.userStories.map((s) => `* *[${s.id}]*: "${s.formattedStory}"`).join('\n')}

h2. 9. Acceptance Criteria
${prd.acceptanceCriteria.map((ac) => `h3. ${ac.id}\n* *GIVEN* ${ac.given}\n* *WHEN* ${ac.when}\n* *THEN* ${ac.then}`).join('\n\n')}

h2. 10. Success Metrics
${prd.successMetrics.map((m) => `* ${m}`).join('\n')}

h2. 11. Risks & Mitigations
${prd.risks.map((r) => `* *Risk:* ${r.risk} | *Mitigation:* ${r.mitigation}`).join('\n')}`;
      }

      return `# ${title} — Product Requirements Document

## 1. Product Overview
${prd.productOverview}

## 2. Problem Statement
> ${prd.problemStatement}

## 3. Business Goals
${prd.businessGoals.map((g) => `- [ ] ${g}`).join('\n')}

## 4. Target User Personas
${prd.userPersonas.map((p) => `- **${p.name}** (${p.role}): Pain Points: ${p.painPoints.join(', ')}`).join('\n')}

## 5. End-to-End User Journey
${prd.userJourney.map((step, i) => `${i + 1}. ${step}`).join('\n')}

## 6. Functional Requirements & RICE Scores
${prd.functionalRequirements.map((fr) => `- **[${fr.id}]** \`${fr.priority}\` **${fr.title}:** ${fr.description} ${fr.rice ? `*(RICE Score: ${fr.rice.score} pts)*` : ''}`).join('\n')}

## 7. Non-Functional Requirements
${prd.nonFunctionalRequirements.map((nfr) => `- ${nfr}`).join('\n')}

## 8. User Stories
${prd.userStories.map((s) => `- **[${s.id}]** \`${s.priority}\`: "${s.formattedStory}"`).join('\n')}

## 9. Acceptance Criteria
${prd.acceptanceCriteria.map((ac) => `### ${ac.id}\n- **GIVEN** ${ac.given}\n- **WHEN** ${ac.when}\n- **THEN** ${ac.then}`).join('\n\n')}

## 10. Success Metrics
${prd.successMetrics.map((m) => `- ${m}`).join('\n')}

## 11. Risks & Mitigations
${prd.risks.map((r) => `- **Risk:** ${r.risk} | **Mitigation:** ${r.mitigation}`).join('\n')}`;
    }

    if (type === 'UserStory') {
      const stories = content as UserStoriesOutput;
      return `# User Stories: ${stories.featureName}\n\n` +
        stories.stories
          .map((s) => `- [ ] **${s.id}** \`${s.priority}\`: "${s.formattedStory}" *(Effort: ${s.estimatedEffort})*`)
          .join('\n');
    }

    if (type === 'AcceptanceCriteria') {
      const criteria = content as AcceptanceCriteriaOutput;
      return `# Acceptance Criteria: ${criteria.featureName}\n> ${criteria.userStory}\n\n` +
        criteria.criteria
          .map(
            (c) =>
              `### ${c.id}\n- **GIVEN** ${c.given}\n- **WHEN** ${c.when}\n- **THEN** ${c.then}\n\n**Verification Checklist:**\n` +
              c.checklistItems.map((ci) => `- [ ] ${ci}`).join('\n')
          )
          .join('\n\n');
    }

    return '';
  }

  /**
   * Triggers clean PDF download via printable HTML window
   */
  static exportPDF(title: string, type: 'PRD' | 'UserStory' | 'AcceptanceCriteria', content: any) {
    const text = this.generateTextExport(title, type, content, 'markdown');
    const printWindow = window.open('', '_blank');
    if (!printWindow) return;

    printWindow.document.write(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>${title} - PDF Export</title>
          <style>
            body { font-family: system-ui, -apple-system, sans-serif; line-height: 1.6; padding: 40px; color: #111827; }
            h1 { font-size: 24px; border-bottom: 2px solid #10b981; padding-bottom: 8px; color: #065f46; }
            h2 { font-size: 18px; margin-top: 24px; color: #047857; border-bottom: 1px solid #e5e7eb; padding-bottom: 4px; }
            h3 { font-size: 15px; color: #374151; }
            blockquote { background: #f0fdf4; border-left: 4px solid #10b981; margin: 0; padding: 12px 16px; font-style: italic; }
            ul, ol { padding-left: 20px; }
            li { margin-bottom: 6px; }
            code { background: #f3f4f6; padding: 2px 6px; borderRadius: 4px; font-family: monospace; font-size: 12px; }
          </style>
        </head>
        <body>
          <div id="content"></div>
          <script src="https://cdn.jsdelivr.net/npm/marked/marked.min.js"></script>
          <script>
            document.getElementById('content').innerHTML = marked.parse(${JSON.stringify(text)});
            setTimeout(() => { window.print(); }, 500);
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  }

  /**
   * Downloads formatted DOCX file
   */
  static exportDOCX(title: string, type: 'PRD' | 'UserStory' | 'AcceptanceCriteria', content: any) {
    const text = this.generateTextExport(title, type, content, 'markdown');
    const blob = new Blob([text], { type: 'application/msword;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${title.toLowerCase().replace(/\s+/g, '-')}.docx`;
    a.click();
    URL.revokeObjectURL(url);
  }
}
