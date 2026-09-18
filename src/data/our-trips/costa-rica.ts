  places?: string[];

  accommodation?: string;

  transport?: string;

  notes?: string[];
}

export interface TripAccommodation {
  location: string;
  name: string;
  nights?: number;

  amount?: number;
  currency?: string;

  paidBy?: "David" | "Itciar" | "unknown";

  notes?: string;

  evidence?: EvidenceSource[];
}

export interface TripBudgetItem {
  category: