import { ReactNode } from 'react';
import { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form';
import { FileWithPath } from 'react-dropzone';

export interface ChildrenProps {
  children: ReactNode;
}

export type IconNames =
  | 'bold/activity.svg'
  | 'bold/activity-outline.svg'
  | 'bold/add.svg'
  | 'bold/add-circle.svg'
  | 'bold/add-square.svg'
  | 'bold/archive-add.svg'
  | 'bold/archive-minus.svg'
  | 'bold/archive-tick.svg'
  | 'bold/arrow-circle-down.svg'
  | 'bold/arrow-circle-left.svg'
  | 'bold/arrow-circle-right.svg'
  | 'bold/arrow-circle-up.svg'
  | 'bold/arrow-down.svg'
  | 'bold/arrow-down-1.svg'
  | 'bold/arrow-down-2.svg'
  | 'bold/arrow-left.svg'
  | 'bold/arrow-left-1.svg'
  | 'bold/arrow-left-2.svg'
  | 'bold/arrow-right.svg'
  | 'bold/arrow-right-1.svg'
  | 'bold/arrow-square-down.svg'
  | 'bold/arrow-square-left.svg'
  | 'bold/arrow-square-right.svg'
  | 'bold/arrow-square-up.svg'
  | 'bold/arrow-up.svg'
  | 'bold/arrow-up-1.svg'
  | 'bold/bag.svg'
  | 'bold/bag-2.svg'
  | 'bold/bag-cross.svg'
  | 'bold/bag-cross-1.svg'
  | 'bold/bag-happy.svg'
  | 'bold/bag-tick.svg'
  | 'bold/bag-tick-2.svg'
  | 'bold/bag-timer.svg'
  | 'bold/barcode.svg'
  | 'bold/calendar.svg'
  | 'bold/call.svg'
  | 'bold/card.svg'
  | 'bold/cards.svg'
  | 'bold/category.svg'
  | 'bold/chart-square.svg'
  | 'bold/clipboard-text.svg'
  | 'bold/clipboard-tick.svg'
  | 'bold/close.svg'
  | 'bold/close-circle.svg'
  | 'bold/close-square.svg'
  | 'bold/danger.svg'
  | 'bold/discount-shape.svg'
  | 'bold/dislike.svg'
  | 'bold/document-copy.svg'
  | 'bold/edit.svg'
  | 'bold/edit-2.svg'
  | 'bold/export.svg'
  | 'bold/eye.svg'
  | 'bold/eye-slash.svg'
  | 'bold/filter.svg'
  | 'bold/filter-add.svg'
  | 'bold/filter-remove.svg'
  | 'bold/filter-tick.svg'
  | 'bold/folder.svg'
  | 'bold/frame.svg'
  | 'bold/frame-1.svg'
  | 'bold/frame-2.svg'
  | 'bold/gallery.svg'
  | 'bold/group.svg'
  | 'bold/group-1.svg'
  | 'bold/heart.svg'
  | 'bold/import.svg'
  | 'bold/key.svg'
  | 'bold/key-square.svg'
  | 'bold/like.svg'
  | 'bold/arrow.svg'
  | 'bold/little-right-arrow.svg'
  | 'bold/little-down-arrow.svg'
  | 'bold/location.svg'
  | 'bold/location-add.svg'
  | 'bold/location-cross.svg'
  | 'bold/location-minus.svg'
  | 'bold/location-slash.svg'
  | 'bold/location-tick.svg'
  | 'bold/lock.svg'
  | 'bold/lock-slash.svg'
  | 'bold/login.svg'
  | 'bold/logout.svg'
  | 'bold/menu.svg'
  | 'bold/message-edit.svg'
  | 'bold/messages-2.svg'
  | 'bold/messages-3.svg'
  | 'bold/message-text.svg'
  | 'bold/minus.svg'
  | 'bold/minus-circle.svg'
  | 'bold/minus-square.svg'
  | 'bold/more.svg'
  | 'bold/more-circle.svg'
  | 'bold/more-square.svg'
  | 'bold/note-add.svg'
  | 'bold/notification.svg'
  | 'bold/people.svg'
  | 'bold/percentage-square.svg'
  | 'bold/profile.svg'
  | 'bold/profile-2user.svg'
  | 'bold/profile-add.svg'
  | 'bold/profile-remove.svg'
  | 'bold/profile-tick.svg'
  | 'bold/receipt-discount.svg'
  | 'bold/receive-square.svg'
  | 'bold/redo.svg'
  | 'bold/refresh-2.svg'
  | 'bold/rotate-left.svg'
  | 'bold/rotate-right.svg'
  | 'bold/save-2.svg'
  | 'bold/scan.svg'
  | 'bold/search-normal.svg'
  | 'bold/search-normal-1.svg'
  | 'bold/security-user.svg'
  | 'bold/send-square.svg'
  | 'bold/setting-2.svg'
  | 'bold/setting-3.svg'
  | 'bold/shield-cross.svg'
  | 'bold/shield-tick.svg'
  | 'bold/shop.svg'
  | 'bold/shop-add.svg'
  | 'bold/shopping-bag.svg'
  | 'bold/shopping-cart.svg'
  | 'bold/shop-remove.svg'
  | 'bold/star.svg'
  | 'bold/tick-circle.svg'
  | 'bold/tick-square.svg'
  | 'bold/timer.svg'
  | 'bold/timer-pause.svg'
  | 'bold/trash.svg'
  | 'bold/truck.svg'
  | 'bold/truck-fast.svg'
  | 'bold/truck-remove.svg'
  | 'bold/truck-tick.svg'
  | 'bold/truck-time.svg'
  | 'bold/undo.svg'
  | 'bold/unlock.svg'
  | 'bold/user.svg'
  | 'bold/wallet.svg'
  | 'bold/wallet-2.svg'
  | 'bold/wallet-money.svg'
  | 'linear/activity.svg'
  | 'linear/add.svg'
  | 'linear/add-circle.svg'
  | 'linear/add-square.svg'
  | 'linear/archive-add.svg'
  | 'linear/archive-minus.svg'
  | 'linear/archive-tick.svg'
  | 'linear/arrow-circle-down.svg'
  | 'linear/arrow-circle-left.svg'
  | 'linear/arrow-circle-right.svg'
  | 'linear/arrow-down.svg'
  | 'linear/arrow-down-1.svg'
  | 'linear/arrow-down-2.svg'
  | 'linear/arrow-left.svg'
  | 'linear/arrow-left-1.svg'
  | 'linear/arrow-left-2.svg'
  | 'linear/arrow-right.svg'
  | 'linear/arrow-right-1.svg'
  | 'linear/arrow-square-down.svg'
  | 'linear/arrow-square-left.svg'
  | 'linear/arrow-square-right.svg'
  | 'linear/arrow-square-up.svg'
  | 'linear/arrow-up.svg'
  | 'linear/arrow-up-1.svg'
  | 'linear/box.svg'
  | 'linear/bag.svg'
  | 'linear/bag-2.svg'
  | 'linear/bag-cross.svg'
  | 'linear/bag-cross-1.svg'
  | 'linear/bag-happy.svg'
  | 'linear/bag-tick.svg'
  | 'linear/bag-tick-2.svg'
  | 'linear/bag-timer.svg'
  | 'linear/barcode.svg'
  | 'linear/calendar.svg'
  | 'linear/call.svg'
  | 'linear/card.svg'
  | 'linear/cards.svg'
  | 'linear/category.svg'
  | 'linear/calculator.svg'
  | 'linear/chart-square.svg'
  | 'linear/clipboard-text.svg'
  | 'linear/clipboard-tick.svg'
  | 'linear/close.svg'
  | 'linear/close-circle.svg'
  | 'linear/close-square.svg'
  | 'linear/discount-shape.svg'
  | 'linear/dislike.svg'
  | 'linear/document-copy.svg'
  | 'linear/edit.svg'
  | 'linear/edit-2.svg'
  | 'linear/export.svg'
  | 'linear/eye.svg'
  | 'linear/eye-slash.svg'
  | 'linear/filter.svg'
  | 'linear/filter-add.svg'
  | 'linear/filter-remove.svg'
  | 'linear/filter-tick.svg'
  | 'linear/folder.svg'
  | 'linear/frame.svg'
  | 'linear/frame-1.svg'
  | 'linear/frame-2.svg'
  | 'linear/gallery.svg'
  | 'linear/group.svg'
  | 'linear/group-1.svg'
  | 'linear/heart.svg'
  | 'linear/key.svg'
  | 'linear/key-square.svg'
  | 'linear/like.svg'
  | 'linear/arrow.svg'
  | 'linear/little-right-arrow.svg'
  | 'linear/little-left-arrow.svg'
  | 'linear/little-top-arrow.svg'
  | 'linear/location.svg'
  | 'linear/location-add.svg'
  | 'linear/location-cross.svg'
  | 'linear/location-minus.svg'
  | 'linear/location-slash.svg'
  | 'linear/location-tick.svg'
  | 'linear/lock.svg'
  | 'linear/lock-slash.svg'
  | 'linear/login.svg'
  | 'linear/logout.svg'
  | 'linear/menu.svg'
  | 'linear/message-edit.svg'
  | 'linear/messages-2.svg'
  | 'linear/messages-3.svg'
  | 'linear/message-text.svg'
  | 'linear/minus.svg'
  | 'linear/minus-circle.svg'
  | 'linear/minus-square.svg'
  | 'linear/more.svg'
  | 'linear/more-circle.svg'
  | 'linear/more-square.svg'
  | 'linear/note-add.svg'
  | 'linear/note-2.svg'
  | 'linear/notification.svg'
  | 'linear/people.svg'
  | 'linear/percentage-square.svg'
  | 'linear/profile.svg'
  | 'linear/profile-2user.svg'
  | 'linear/profile-add.svg'
  | 'linear/profile-remove.svg'
  | 'linear/profile-tick.svg'
  | 'linear/receipt-discount.svg'
  | 'linear/receive-square.svg'
  | 'linear/redo.svg'
  | 'linear/refresh-2.svg'
  | 'linear/rotate-left.svg'
  | 'linear/rotate-right.svg'
  | 'linear/save-2.svg'
  | 'linear/scan.svg'
  | 'linear/search-normal.svg'
  | 'linear/search-normal-1.svg'
  | 'linear/security-user.svg'
  | 'linear/send-square.svg'
  | 'linear/setting-2.svg'
  | 'linear/setting-3.svg'
  | 'linear/shield-cross.svg'
  | 'linear/shopping-cart.svg'
  | 'linear/shield-tick.svg'
  | 'linear/shop.svg'
  | 'linear/shop-add.svg'
  | 'linear/shopping-bag.svg'
  | 'linear/shop-remove.svg'
  | 'linear/star.svg'
  | 'linear/status-up.svg'
  | 'linear/tick-circle.svg'
  | 'linear/tick-square.svg'
  | 'linear/timer.svg'
  | 'linear/timer-pause.svg'
  | 'linear/trash.svg'
  | 'linear/truck-remove.svg'
  | 'linear/truck-tick.svg'
  | 'linear/truck-time.svg'
  | 'linear/undo.svg'
  | 'linear/user-ocatgon.svg'
  | 'linear/unlock.svg'
  | 'linear/user.svg'
  | 'linear/wallet.svg'
  | 'linear/wallet-2.svg'
  | 'linear/user-search.svg';

export interface IconProps {
  pathName: IconNames;
  size?: number;
  color?: string;
}

export interface CardComponentProps extends ChildrenProps {
  title?: string;
  subheader?: string;
  buttonText?: string;
  cardStyles?: any;
  action?: ReactNode;
  divider?: boolean;
  closeBtn?: boolean;
}

export interface paginationComponentProps {
  total: number;
}

export interface TableHeadItem {
  title: string;
  width: string;
  minWidth: string;
  align: 'right' | 'left' | 'center';
}

export interface TableComponentProps {
  tableHeadItems: TableHeadItem[];
  children: ReactNode;
  total?: number;
}

export interface NotFoundBoxProps {
  title: string;
}

// dropzone component interfaces :

export type FileRejection = {
  file: File;
  errors: {
    code: string;
    message: string;
  }[];
};

export interface DropzoneComponentProps {
  watch: UseFormWatch<any>;
  register: UseFormRegister<any>;
  setValue: UseFormSetValue<any>;
  label: string;
  inputName: string;
  disabled?: boolean;
  multiple?: boolean;
  required?: boolean;
}

export interface DropzoneErrorMessageProps {
  watch: UseFormWatch<any>;
  errors: any;
  inputName: string;
}

export interface DropzoneImagesBoxProps {
  watch: UseFormWatch<any>;
  removeFile: (fileName: FileWithPath) => void;
  inputName: string;
}

export interface DropzoneprofileBoxProps extends DropzoneImagesBoxProps {
  errors: any;
}
