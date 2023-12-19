import { ChangeEvent } from 'react';

export interface MessageSectionProps {
  label: string;
  value: string;
  handleChange: (e: ChangeEvent<HTMLInputElement>) => void;
}
