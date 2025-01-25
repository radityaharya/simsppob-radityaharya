import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers/store';

function BalanceCardSkeleton() {
  return (
    <div className="h-full flex-col bg-red-500/90 text-white p-4 sm:p-6 rounded-2xl flex justify-between items-start gap-2 sm:gap-4">
      <div className="flex flex-col items-start gap-1 sm:gap-3 w-full">
        <div className="h-4 sm:h-5 w-20 sm:w-24 bg-white/20 rounded animate-pulse" />
        <div className="h-8 sm:h-10 w-48 sm:w-64 bg-white/20 rounded animate-pulse" />
      </div>
      <div className="h-6 w-24 bg-white/20 rounded animate-pulse" />
    </div>
  );
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

  if (transactionLoading) {
    return <BalanceCardSkeleton />;
  }

  return (
    <div className="h-full flex-col bg-red-500 text-white p-4 sm:p-6 rounded-2xl flex justify-between items-start gap-2 sm:gap-4">
      <div className="flex flex-col items-start gap-1 sm:gap-3">
        <p className="text-xs sm:text-lg text-white" id="balance-label">
          Saldo anda
        </p>
        <h3 className="text-2xl sm:text-4xl font-bold" aria-labelledby="balance-label">
          {showBalance ? balance : 'Rp • • • • • • • •'}
        </h3>
      </div>
      <div>
        <Button
          variant="link"
          className="text-white px-0 text-xs sm:text-base"
          onClick={toggleBalance}
          aria-label={`${showBalance ? 'Sembunyikan' : 'Tampilkan'} saldo`}
        >
          <p className="text-xs sm:text-sm">lihat Saldo</p>
          {showBalance ? <EyeOff aria-hidden="true" /> : <Eye aria-hidden="true" />}
        </Button>
      </div>
    </div>
  );
}
