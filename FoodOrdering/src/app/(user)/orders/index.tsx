import { FlatList, View ,Text} from "react-native";
import Colors from "@/src/constants/Colors";
import products from "@/assets/data/products";
import ProductListItem from "@/src/components/ProductListItem";
import orders from "@/assets/data/orders";
import OrderListItem from "@/src/components/OrderListItem";

export default function OrdersScreen() {
    
  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderListItem order={item} />}
     
      contentContainerStyle={{gap:10,padding:10}}
     
    />
    
  );
}
