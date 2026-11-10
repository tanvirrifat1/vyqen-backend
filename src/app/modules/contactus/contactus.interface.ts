export type InquiryStatus = 'new' | 'contacted' | 'resolved';
export type IInquiry = {
  name: string;
  phone: string;
  description: string;
  email?: string;
  status: InquiryStatus;
};
