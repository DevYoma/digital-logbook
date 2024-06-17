// Supabase DailyLog Types
export type ExistingEntry = {
    created_at: string;
    date: string;
    id: string;
    text: string;
    user_id: string;
}

// Profile Data Types
export type ProfileData = {
  name: string;
  email: string;
  schoolName: string;
  department: string;
  duration: string;
  startDate: Date | unknown;
}

type Amount = {
    amount: number
}

type PickedFromProfileData = Pick<ProfileData, 'name' | 'email' >;

export type CombinedTypeForPayment = PickedFromProfileData & Amount;