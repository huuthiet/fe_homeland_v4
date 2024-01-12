/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'MoneyInformationDetail.containers';

export default defineMessages({
  updateBank: {
    id: `${scope}.updateBank`,
    defaultMessage: 'Cập Nhật Thông Tin',
  },
  addBank: {
    id: `${scope}.addBank`,
    defaultMessage: 'Thêm Thông Tin',
  },
  stk: {
    id: `${scope}.stk`,
    defaultMessage: 'Vui lòng Số Tài Khoản',
  },
  nameTk: {
    id: `${scope}.nameTk`,
    defaultMessage: 'Vui lòng Tên Tài Khoản',
  },
  bank: {
    id: `${scope}.bank`,
    defaultMessage: 'Vui lòng Ngân Hàng',
  },
  branch: {
    id: `${scope}.branch`,
    defaultMessage: 'Vui lòng Chi Nhánh',
  },
  imgBank: {
    id: `${scope}.imgBank`,
    defaultMessage: 'Hình ảnh Chuyển Khoản',
  },
  SizeImage: {
    id: `UpdateMotel.containers.SizeImage`,
    defaultMessage: 'Kích thước phải dưới 2mb',
  },
});
