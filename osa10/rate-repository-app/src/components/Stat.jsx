import { View } from 'react-native';
import Text from './Text';

const Stat = ({ amount, text }) => {
  const toShow = amount >= 1000 ? `${Math.round(amount / 100) / 10}k` : amount;
  return (
    <View>
      <Text fontWeight={'bold'} style={{ textAlign: 'center' }}>
        {toShow}
      </Text>
      <Text>{text}</Text>
    </View>
  );
};

export default Stat;
