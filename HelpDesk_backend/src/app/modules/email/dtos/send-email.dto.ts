export interface SendEmailDTO {
  to: string;
  subject: string;
  html: string;

  from?: string;
  text?: string;
}
