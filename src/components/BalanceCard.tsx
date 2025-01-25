import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers/store';

function BalanceAmountSkeleton() {
  return <div className="h-8 sm:h-10 w-[300px] bg-white/20 rounded animate-pulse" />;
}

export function BalanceCard() {
  const [showBalance, setShowBalance] = useState(false);
  const { balance: rawBalance, loading: transactionLoading } = useSelector(
    (state: RootState) => state.transaction
  );

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  const balance = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(rawBalance ?? 0);

  return (
    <div className="h-[160px] bg-red-500 text-white p-4 sm:p-6 rounded-2xl flex flex-col justify-between items-start">
      <div className="flex flex-col items-start gap-1 sm:gap-3">
        <p className="text-xs sm:text-lg text-white" id="balance-label">
          Saldo anda
        </p>
        {transactionLoading ? (
          <BalanceAmountSkeleton />
        ) : (
          <h3 className="text-2xl sm:text-4xl font-bold w-[300px]" aria-labelledby="balance-label">
            {showBalance ? balance : 'Rp • • • • • • • •'}
          </h3>
        )}
      </div>
      <div>
        <Button
          variant="link"
          className="text-white px-0 text-xs sm:text-base"
          onClick={toggleBalance}
          disabled={transactionLoading}
          aria-label={`${showBalance ? 'Sembunyikan' : 'Tampilkan'} saldo`}
        >
          <p className="text-xs sm:text-sm">lihat Saldo</p>
          {showBalance ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        </Button>
      </div>
    </div>
  );
}
