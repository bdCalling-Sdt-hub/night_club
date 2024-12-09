import {Text, View} from 'react-native';

import React from 'react';
import tw from '../../lib/tailwind'; // Tailwind helper function

interface PriorityCardProps {
  status: string;
  cardStyle?: 'seller' | 'buyer';
}

const PriorityCard = ({status, cardStyle}: PriorityCardProps) => {
  const statusColors = {
    Pending: 'bg-yellow-100 text-yellow-800',
    Canceled: 'bg-red-100 text-red-800',
    Accepted: 'bg-blue-100 text-blue-800',
    DeliveryRequest: 'bg-orange-100 text-orange-800',
    AcceptDelivery: 'bg-green-100 text-green-800',
    RejectDelivery: 'bg-gray-100 text-gray-800',
    AmountReturned:
      cardStyle === 'seller'
        ? 'bg-gray-100 text-gray-800'
        : 'bg-green-100 text-green-800',
  };

  const colorClasses = statusColors[status] || 'bg-gray-100 text-gray-800';

  return (
    <View
      style={tw`rounded-md p-1 px-3 self-start ${colorClasses.split(' ')[0]}`}>
      <Text style={tw`text-sm font-semibold ${colorClasses.split(' ')[1]}`}>
        {status}
      </Text>
    </View>
  );
};

export default PriorityCard;
