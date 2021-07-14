export interface Message {
    sent_by_support?: boolean,
    text: string,
    visitor_ip: string,
    visitor_name?: string
}