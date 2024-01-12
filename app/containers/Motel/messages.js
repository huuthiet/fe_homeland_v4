/*
 * NotFoundPage Messages
 *
 * This contains all the text for the NotFoundPage container.
 */
import { defineMessages } from 'react-intl';

export const scope = 'Motel.containers';

export default defineMessages({
    Floor: {
        id: `${scope}.Floor`,
        defaultMessage: 'Tầng'
    },
    Room: {
        id: `${scope}.Room`,
        defaultMessage: 'Phòng'
    },
    NumberofFloors: {
        id: `${scope}.NumberofFloors`,
        defaultMessage: 'Số tầng:'
    },
    All: {
        id: `${scope}.All`,
        defaultMessage: 'Tất cả:'
    },
    PriceFluctuates: {
        id: `${scope}.PriceFluctuates`,
        defaultMessage: 'Giá dao động:'
    },
    description: {
        id: `${scope}.description`,
        defaultMessage: 'Mổ tả:'
    },
    address: {
        id: `${scope}.address`,
        defaultMessage: 'Địa chỉ:'
    },
    Detail: {
        id: `${scope}.Detail`,
        defaultMessage: 'Chi tiết'
    },
    AddedFloorSuccessfully: {
        id: `${scope}.AddedFloorSuccessfully`,
        defaultMessage: 'Đã thêm tầng thành công'
    },
    addFloor: {
        id: `${scope}.addFloor`,
        defaultMessage: 'Bạn thực sự muốn thêm tầng?'
    },

});