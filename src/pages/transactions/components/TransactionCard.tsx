import { TransactionDataSchema } from '~/types/schemas/transaction';
import { z } from 'zod';
import { cn } from '../../../lib/utils';
import { Card, CardContent } from '~/components/ui/card';

type TransactionCardProps = {
  transaction: z.infer<typeof TransactionDataSchema>;
};

export const TransactionCard = ({ transaction }: TransactionCardProps) => {
  const isPayment = transaction.transaction_type === 'PAYMENT';
  const amount = new Intl.NumberFormat('id-ID').format(transaction.total_amount);
  const date = new Date(transaction.created_on);
  const dateTime = `${date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })} ${date.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  })} WIB`;

  return (
    <Card className="mb-4 border border-gray-200 shadow-none">
      <CardContent className="pt-6">
        <div className="flex justify-between items-start">
          <div className="flex flex-col gap-1">
            <span
              className={cn('text-2xl font-bold', isPayment ? 'text-red-500' : 'text-green-500')}
            >
              {isPayment ? '- ' : '+ '}Rp {amount}
            </span>
            <span className="text-xs text-muted-foreground">{dateTime}</span>
          </div>
          <div className="text-right">
            <span className="text-xs">{transaction.description || transaction.service_name}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
