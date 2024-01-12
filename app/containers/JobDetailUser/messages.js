/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'Job.containers';

export default defineMessages({
  ErrrCheckInDate: {
    id: `${scope}.ErrrCheckInDate`,
    defaultMessage: 'Vui lòng chọn ngày nhận phòng',
  },
  ErrrFullName: {
    id: `${scope}.ErrrFullName`,
    defaultMessage: 'Vui lòng nhập tên đầy đủ',
  },
  ErrrPhone: {
    id: `${scope}.ErrrPhone`,
    defaultMessage: 'Vui lòng nhập số điện thoại',
  },
  ErrrMonth: {
    id: `${scope}.ErrrMonth`,
    defaultMessage: 'Vui lòng nhập số tháng thuê',
  },
  ErrrPayment: {
    id: `${scope}.ErrrPayment`,
    defaultMessage: 'Vui lòng chọn hình thức thanh toán',
  },
  InternalWallet: {
    id: `${scope}.InternalWallet`,
    defaultMessage: 'Ví nội bộ',
  },
  AmountOfMoney: {
    id: `${scope}.AmountOfMoney`,
    defaultMessage: 'Số tiền',
  },
  AmountOfMoneyDec: {
    id: `${scope}.AmountOfMoneyDec`,
    defaultMessage:
      'Sẽ trừ nó vào ví của bạn, bạn có thực sự muốn thanh toán không?',
  },
  Accept: {
    id: `${scope}.Accept`,
    defaultMessage: 'Chấp Nhận',
  },
  Cancel: {
    id: `${scope}.Cancel`,
    defaultMessage: 'Hủy',
  },
  CheckinDate: {
    id: `${scope}.CheckinDate`,
    defaultMessage: 'Ngày nhận phòng',
  },
  PeopleRomSet: {
    id: `${scope}.PeopleRomSet`,
    defaultMessage: 'Người đặt phòng',
  },
  FullName: {
    id: `${scope}.FullName`,
    defaultMessage: 'Nhập tên đầy đủ...',
  },
  Phone: {
    id: `${scope}.Phone`,
    defaultMessage: 'Số điện thoại',
  },
  EnterPhone: {
    id: `${scope}.EnterPhone`,
    defaultMessage: 'Nhập số điện thoại...',
  },
  PriceRentedMonth: {
    id: `${scope}.PriceRentedMonth`,
    defaultMessage: 'Giá thuê một tháng',
  },
  RentalContract: {
    id: `${scope}.RentalContract`,
    defaultMessage: 'Hợp đồng cho thuê',
  },
  BondMoney: {
    id: `${scope}.BondMoney`,
    defaultMessage: 'Tiền thế chân',
  },
  TotalMoney: {
    id: `${scope}.TotalMoney`,
    defaultMessage: 'Tổng tiền',
  },

  PaymentUponCheckIn: {
    id: `${scope}.PaymentUponCheckIn`,
    defaultMessage: 'Thanh toán khi nhận phòng',
  },
  BlankFromDate: {
    id: `${scope}.BlankFromDate`,
    defaultMessage: 'Trống từ ngày',
  },
  Finish: {
    id: `${scope}.Finish`,
    defaultMessage: 'Hoàn thành',
  },
  CheckOutRoom: {
    id: `${scope}.CheckOutRoom`,
    defaultMessage: 'Trả phòng',
  },
  ErrCheckRoom: {
    id: `${scope}.ErrCheckRoom`,
    defaultMessage:
      'Ngày trả phòng sớn hơn so với hợp đồng, bạn sẽ mất cọc khi trả phòng. Bạn thực sự muốn chọn ngày',
  },
  ErrCheckRoomOut: {
    id: `${scope}.ErrCheckRoomOut`,
    defaultMessage: 'để trả phòng?',
  },
  ErrCheckRom: {
    id: `${scope}.ErrCheckRom`,
    defaultMessage: 'Bạn thực sự muốn chọn một ngày',
  },
  InformationRoom: {
    id: `${scope}.InformationRoom`,
    defaultMessage: 'Thông tin cho thuê phòng',
  },
  Motel: {
    id: `${scope}.Motel`,
    defaultMessage: 'Nhà trọ',
  },
  Room: {
    id: `${scope}.Room`,
    defaultMessage: 'Phòng',
  },
  Activated: {
    id: `${scope}.Activated`,
    defaultMessage: 'Đã kích hoạt',
  },
  Deposit: {
    id: `${scope}.Deposit`,
    defaultMessage: 'Đặt cọc',
  },
  PaymentDeposit: {
    id: `${scope}.PaymentDeposit`,
    defaultMessage: 'Tài Khoản Bạn Không Đủ, Vui Làm Nạp Thêm',
  },

  Activate: {
    id: `${scope}.Activate`,
    defaultMessage: 'Kích hoạt',
  },
  PriceRoom: {
    id: `${scope}.PriceRoom`,
    defaultMessage: 'Giá phòng',
  },
  Deposited: {
    id: `${scope}.Deposited`,
    defaultMessage: 'Tiền cọc giữ phòng',
  },
  RoomLockCode: {
    id: `${scope}.RoomLockCode`,
    defaultMessage: 'Mã khóa phòng',
  },
  CheckOutDate: {
    id: `${scope}.CheckOutDate`,
    defaultMessage: 'Ngày trả phòng',
  },
  NumberOfDays: {
    id: `${scope}.NumberOfDays`,
    defaultMessage: 'Số ngày ở',
  },
  PaymentDate: {
    id: `${scope}.PaymentDate`,
    defaultMessage: 'Ngày thanh toán',
  },
  BalanceInWallet: {
    id: `${scope}.BalanceInWallet`,
    defaultMessage: 'Số dư trong ví',
  },
  Paid: {
    id: `${scope}.Paid`,
    defaultMessage: 'Đã thanh toán',
  },
  Pay: {
    id: `${scope}.Pay`,
    defaultMessage: 'Thanh toán',
  },
});
