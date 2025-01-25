import { useEffect } from 'react';
import { BalanceCard } from '~/components/BalanceCard';
import { UserWelcome } from '~/components/UserWelcome';
import { useAppDispatch, useAppSelector } from '~/store/reducers/store';
import { getTransactionHistory } from '~/store/actions/transaction';
import { TransactionCard } from './components/TransactionCard';

export default function TransactionsPage() {
  const dispatch = useAppDispatch();
  const { history, loading, error, pagination } = useAppSelector(state => state.transaction);

  useEffect(() => {
    dispatch(getTransactionHistory({ offset: 0, limit: 5 }));
  }, [dispatch]);

  if (error) {
    return (
      <div className="text-center text-red-600 mt-4" role="alert">
        Error: {error}
      </div>
    );
  }

  const loadMore = () => {
    if (!loading && pagination.hasMore) {
      dispatch(
        getTransactionHistory({
          offset: pagination.offset + pagination.limit,
          limit: pagination.limit,
        })
      );
    }
  };

  return (
    <div className="max-w-screen overflow-x-hidden" role="main">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-stretch gap-4 mb-8 sm:mb-16">
          <section className="w-full sm:w-2/5" aria-label="User Profile">
            <UserWelcome />
          </section>

          <section className="w-full sm:w-3/5" aria-label="Balance Information">
            <BalanceCard />
          </section>
        </div>

        <div className="max-w-7xl mx-auto sm:px-6">
          <section
            className="mb-8 sm:mb-16 sm:px-0"
            aria-label="Transaction History"
            aria-busy={loading}
          >
            <h2 className="text-2xl font-semibold mb-6 sm:mb-12" id="transaction-list-title">
              Semua Transaksi
            </h2>
            <div className="space-y-4" role="feed" aria-labelledby="transaction-list-title">
              {history?.length === 0 && !loading && (
                <div className="text-center text-gray-500" role="status" aria-live="polite">
                  Maaf tidak ada histori transaksi saat ini
                </div>
              )}
              {history?.map(transaction => (
                <TransactionCard key={transaction.invoice_number} transaction={transaction} />
              ))}
              {loading && (
                <div className="text-center py-4" role="status" aria-live="polite">
                  <div
                    className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-t-red-500 border-red-200"
                    aria-label="Loading transactions"
                  />
                </div>
              )}
              {pagination.hasMore && !loading && (
                <button
                  onClick={loadMore}
                  className="w-full py-2 text-center text-primary hover:text-primary/80"
                  aria-label="Load more transactions"
                  disabled={loading}
                >
                  Show More
                </button>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
