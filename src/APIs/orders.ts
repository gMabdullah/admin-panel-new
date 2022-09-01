import axios from 'axios';
// import useAxios from 'axios-hooks';
import { OrderRequestProps, OrderResponseProps } from "../types/orders"
export const getOrdersList = async () => {
// const [{ data, loading, error }, refetch] = useAxios(
//     'https://tossdown.com/api/order_get'
//   )
try{
	const formData =  new FormData();

	formData.append('eatout_id', JSON.stringify(12277));
	formData.append('type', 'Live');
	formData.append('offset', JSON.stringify(0))
	formData.append('return_statuses', JSON.stringify(1));
	formData.append('limit', JSON.stringify(100));
	formData.append('attributes', JSON.stringify(1))
	formData.append('source', 'biz');
	formData.append('admin_id', JSON.stringify(292968));

await axios.post<OrderRequestProps>('https://tossdown.com/api/order_get', formData)
	// .then(response: <OrderResponseProps>)
// console.log(
// 	"data", data
// )
}catch(err){
	console.log(
		"Error", err
	)
}

}
