
export interface FamilyGroup {
  id: string;
  name: string;
}

export interface Message {
  id: string;
  title: string;
  body: string;
  recipients: string[]; // Array of FamilyGroup names
  timestamp: Date;
}
