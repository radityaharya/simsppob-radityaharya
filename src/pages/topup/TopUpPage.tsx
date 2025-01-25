import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { BalanceCard } from '~/components/BalanceCard';
import { UserWelcome } from '~/components/UserWelcome';
import { Input } from '~/components/ui/input';
import { Button } from '~/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormMessage } from '@/components/ui/form';
import { Banknote, Check, X, Wallet } from 'lucide-react';
import { useAppDispatch } from '~/store/reducers/store';
import { postTopup } from '~/store/actions/transaction';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const formSchema = z.object({
  amount: z
    .string()
    .min(1, 'Amount is required')
    .refine(val => !isNaN(Number(val)) && Number(val) >= 10000, {
      message: 'Amount must be greater than Rp 10,000',
    })
    .refine(val => Number(val) <= 1000000, {
      message: 'Amount must be less than Rp 1,000,000',
    }),
});

type FormValues = z.infer<typeof formSchema>;

const presetAmounts = [10000, 20000, 50000, 100000, 250000, 500000];

export default function TopUpPage() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isResultDialogOpen, setIsResultDialogOpen] = useState(false);
  const [topupResult, setTopupResult] = useState<{
    success: boolean;
    amount: string;
  } | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      amount: '',
    },
  });

  const handleConfirmTopUp = async () => {
    try {
      const amount = form.getValues('amount');
      const response = await dispatch(postTopup({ top_up_amount: parseInt(amount) })).unwrap();
      setIsDialogOpen(false);
      setTopupResult({
        success: true,
        amount: amount,
      });
      setIsResultDialogOpen(true);
      form.reset();
    } catch (error) {
      setIsDialogOpen(false);
      setTopupResult({
        success: false,
        amount: form.getValues('amount'),
      });
      setIsResultDialogOpen(true);
    }
  };

  const onSubmit = (data: FormValues) => {
    setIsDialogOpen(true);
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
          <section className="mb-8 sm:mb-16 sm:px-0" aria-label="Top Up Form" role="form">
            <h2 className="text-2xl font-semibold mb-6 sm:mb-12" id="topup-heading">
              <span className="text-lg font-normal text-muted-foreground">Silahkan masukan</span>
              <br />
              Nominal Top Up
            </h2>

            <div className="flex flex-col-reverse sm:flex-row gap-4 w-full">
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="space-y-4 flex-1"
                  aria-labelledby="topup-heading"
                >
                  <FormField
                    control={form.control}
                    name="amount"
                    render={({ field }) => (
                      <FormItem className="w-full">
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Masukan nominal Top Up"
                            {...field}
                            className="w-full"
                            leftAddons={
                              <Banknote className="h-4 w-4 text-gray-400" aria-hidden="true" />
                            }
                            aria-label="Top Up Amount"
                            min="10000"
                            max="1000000"
                          />
                        </FormControl>
                        <FormMessage role="alert" />
                      </FormItem>
                    )}
                  />

                  <Button
                    type="submit"
                    className={`w-full ${!form.formState.isValid ? 'bg-gray-400 hover:bg-gray-400' : 'bg-red-500 hover:bg-red-600'}`}
                    disabled={!form.formState.isValid}
                    aria-disabled={!form.formState.isValid}
                  >
                    Top Up
                  </Button>

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
                            <DialogDescription className="text-base" id="confirmation-dialog-title">
                              Apakah anda yakin untuk top up sebesar
                            </DialogDescription>
                            <p className="text-3xl font-bold" aria-live="polite">
                              Rp {parseInt(form.getValues('amount') || '0').toLocaleString()} ?
                            </p>
                          </div>
                        </div>
                      </DialogHeader>
                      <DialogFooter className="flex flex-col gap-2 mt-6">
                        <Button
                          type="button"
                          variant="link"
                          className="text-lg font-bold"
                          onClick={handleConfirmTopUp}
                        >
                          Ya, Lanjutkan Top Up
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
                            className={`h-16 w-16 rounded-full ${topupResult?.success ? 'bg-green-500' : 'bg-red-500'} flex items-center justify-center`}
                            aria-hidden="true"
                          >
                            {topupResult?.success ? (
                              <Check className="h-8 w-8 text-white" />
                            ) : (
                              <X className="h-8 w-8 text-white" />
                            )}
                          </div>
                          <div className="space-y-1">
                            <DialogTitle className="text-xl" id="result-dialog-title">
                              Top up sebesar
                            </DialogTitle>
                            <p className="text-3xl font-bold" aria-live="polite">
                              Rp {parseInt(topupResult?.amount || '0').toLocaleString()}
                            </p>
                          </div>
                          <DialogDescription className="text-lg font-medium" aria-live="polite">
                            {topupResult?.success ? 'berhasil' : 'gagal'}!
                          </DialogDescription>
                        </div>
                      </DialogHeader>
                      <DialogFooter className="flex flex-col mt-6">
                        <Button
                          type="button"
                          variant="link"
                          className="text-lg font-medium"
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
                </form>
              </Form>

              <div
                className="grid grid-cols-3 gap-4 h-fit flex-1"
                role="group"
                aria-label="Preset top up amounts"
              >
                {presetAmounts.map(amount => (
                  <Button
                    key={amount}
                    type="button"
                    variant="outline"
                    onClick={() => {
                      form.setValue('amount', amount.toString(), { shouldValidate: true });
                    }}
                    className="w-full"
                    aria-label={`Top up Rp ${amount.toLocaleString()}`}
                  >
                    Rp {amount.toLocaleString()}
                  </Button>
                ))}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
