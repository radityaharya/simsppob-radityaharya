import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '~/store/reducers/store';
import { postTransaction } from '~/store/actions/transaction';
import { BalanceCard } from '~/components/BalanceCard';
import { UserWelcome } from '~/components/UserWelcome';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Check, X, Banknote, Wallet } from 'lucide-react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { NotFound } from '../NotFoundPage';

export default function ServicesPage() {
  const { serviceCode } = useParams();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const service = useAppSelector(state =>
    state.information.services.find(s => s.service_code === serviceCode?.toUpperCase())
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [transactionResult, setTransactionResult] = useState<{
    success: boolean;
    amount: number;
  } | null>(null);

  if (!service) {
    return <NotFound />;
  }

  const handleConfirmPayment = async () => {
    try {
      await dispatch(postTransaction({ service_code: serviceCode!.toUpperCase() })).unwrap();
      setIsDialogOpen(false);
      setTransactionResult({
        success: true,
        amount: service.service_tariff,
      });
      setIsResultDialogOpen(true);
    } catch {
      setIsDialogOpen(false);
      setTransactionResult({
        success: false,
        amount: service.service_tariff,
      });
      setIsResultDialogOpen(true);
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
          <section className="mb-8 sm:mb-16 sm:px-0" aria-label="Payment Form" role="form">
            <div className="mb-6 sm:mb-12">
              <h2 className="text-2xl font-semibold" id="payment-heading">
                <span className="text-lg font-normal text-muted-foreground">Pembayaran</span>
              </h2>
              <div className="flex items-center gap-4 mt-2 font-medium text-lg">
                <img src={service.service_icon} alt="" className="w-8 h-8 object-contain" />
                <span>{service.service_name}</span>
              </div>
            </div>

            <div className="space-y-4">
              <Input
                type="text"
                value={`Rp ${service.service_tariff.toLocaleString()}`}
                className="w-full"
                disabled
                leftAddons={<Banknote className="h-4 w-4 text-gray-400" aria-hidden="true" />}
                aria-label="Service Tariff"
              />

              <Button
                onClick={() => setIsDialogOpen(true)}
                className="w-full bg-red-500 hover:bg-red-600"
              >
                Bayar
              </Button>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogContent
                className="duration-0 data-[state=open]:duration-0 data-[state=closed]:duration-0 text-center p-8"
                aria-labelledby="confirmation-dialog-title"
                role="alertdialog"
              >
                <DialogHeader className="text-center space-y-6">
                  <div className="flex flex-col items-center space-y-6">
                    <div
                      className="h-16 w-16 rounded-full bg-primary flex items-center justify-center"
                      aria-hidden="true"
                    >
                      <Wallet className="h-8 w-8 text-white" />
                    </div>
                    <div className="flex flex-col items-center space-y-2">
                      <DialogDescription
                        className="text-base font-bold"
                        id="confirmation-dialog-title"
                      >
                        Beli {service.service_name} senilai
                      </DialogDescription>
                      <p className="text-3xl font-bold" aria-live="polite">
                        Rp {service.service_tariff.toLocaleString()} ?
                      </p>
                    </div>
                  </div>
                </DialogHeader>
                <DialogFooter className="flex flex-col gap-2 mt-6">
                  <Button
                    type="button"
                    variant="link"
                    className="text-lg font-bold"
                    onClick={handleConfirmPayment}
                  >
                    Ya, Lanjutkan Bayar
                  </Button>
                  <Button
                    type="button"
                    variant="link"
                    className="text-lg text-muted-foreground"
                    onClick={() => setIsDialogOpen(false)}
                  >
                    Batalkan
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>

            <Dialog open={isResultDialogOpen} onOpenChange={setIsResultDialogOpen}>
              <DialogContent
                className="duration-0 data-[state=open]:duration-0 data-[state=closed]:duration-0 text-center p-8"
                aria-labelledby="result-dialog-title"
                role="alertdialog"
              >
                <DialogHeader>
                  <div className="flex flex-col items-center gap-6">
                    <div
                      className={`h-16 w-16 rounded-full ${
                        transactionResult?.success ? 'bg-green-500' : 'bg-red-500'
                      } flex items-center justify-center`}
                      aria-hidden="true"
                    >
                      {transactionResult?.success ? (
                        <Check className="h-8 w-8 text-white" />
                      ) : (
                        <X className="h-8 w-8 text-white" />
                      )}
                    </div>
                    <div className="">
                      <DialogTitle
                        className="text-xl font-semibold text-muted-foreground"
                        id="result-dialog-title"
                      >
                        Pembayaran {service.service_name} sebesar
                      </DialogTitle>
                      <p className="text-3xl font-bold" aria-live="polite">
                        Rp {transactionResult?.amount.toLocaleString()}
                      </p>
                    </div>
                    <DialogDescription className="text-lg font-medium" aria-live="polite">
                      {transactionResult?.success ? 'berhasil' : 'gagal'}!
                    </DialogDescription>
                  </div>
                </DialogHeader>
                <DialogFooter className="flex flex-col mt-6">
                  <Button
                    type="button"
                    variant="link"
                    className="text-lg font-bold"
                    onClick={() => {
                      setIsResultDialogOpen(false);
                      navigate('/');
                    }}
                  >
                    Kembali ke Beranda
                  </Button>
                </DialogFooter>
              </DialogContent>
            </Dialog>
          </section>
        </div>
      </div>
    </div>
  );
}
