import React, { useState } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Eye, EyeOff } from 'lucide-react';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers/store';

export default function HomePage() {
  const [showBalance, setShowBalance] = useState(false);
  const { profile, loading: membershipLoading } = useSelector(
    (state: RootState) => state.membership
  );
  const {
    services,
    banners,
    loading: informationLoading,
  } = useSelector((state: RootState) => state.information);
  const { balance: rawBalance, loading: transactionLoading } = useSelector(
    (state: RootState) => state.transaction
  );

  // TODO: better loading state
  if (membershipLoading || informationLoading || transactionLoading) {
    return <div>Loading...</div>;
  }

  const toggleBalance = () => {
    setShowBalance(!showBalance);
  };

  const name =
    profile?.first_name && profile?.last_name
      ? `${profile.first_name} ${profile.last_name}`
      : 'User';

  const nameFallback = name
    .split(' ')
    .map(word => word[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  const balance = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(rawBalance ?? 0);

  return (
    <div className="max-w-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-stretch gap-4 mb-8 sm:mb-16">
          <section className="w-full sm:w-2/5" aria-label="User Profile">
            <div className="h-full bg-background px-0 sm:px-6 py-4 rounded-2xl flex sm:flex-col sm:justify-end gap-4">
              <Avatar className="size-12 sm:size-16">
                <AvatarImage src={profile?.profile_image} alt={`Profile picture of ${name}`} />
                <AvatarFallback>{nameFallback}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm sm:text-lg font-medium text-muted-foreground">
                  Selamat datang,
                </p>
                <h2 className="text-xl sm:text-3xl font-bold">{name}</h2>
              </div>
            </div>
          </section>

          <section className="w-full sm:w-3/5" aria-label="Balance Information">
            <div className="h-full flex-col bg-red-500 text-white p-4 sm:p-6 rounded-2xl flex justify-between items-start gap-2 sm:gap-4">
              <div className="flex flex-col items-start gap-1 sm:gap-3">
                <p className="text-xs sm:text-lg text-white" id="balance-label">
                  Saldo anda
                </p>
                <h3 className="text-2xl sm:text-4xl font-bold" aria-labelledby="balance-label">
                  {/* TODO: */}
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
          </section>
        </div>

        <section className="mb-8 sm:mb-16 px-4 sm:px-0" aria-label="Available Services">
          <h2 className="sr-only">Layanan Tersedia</h2>
          <div className="flex flex-wrap justify-between gap-4 sm:gap-2">
            {services.map(service => (
              <div
                key={service.service_code}
                className="flex flex-col items-center sm:basis-[calc(8.33%-8px)]"
                role="listitem"
              >
                <div className="size-16">
                  <img
                    src={service.service_icon}
                    alt={`Icon for ${service.service_name}`}
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="mt-2 text-[0.6rem] sm:text-xs font-medium text-center w-16 sm:w-20 break-words">
                  {service.service_name}
                </span>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="relative w-screen mx-auto" aria-label="Promotional Banners">
        <div className="max-w-7xl mx-auto mb-4">
          <h2 className="text-base sm:text-lg mx-auto px-4 sm:px-6 font-medium">
            Temukan promo menarik
          </h2>
        </div>
        <div
          className="overflow-x-auto"
          role="region"
          aria-label="Scroll through promotional banners"
        >
          {/* TODO: scroll styling */}
          <div className="flex gap-4 px-4 sm:px-[calc((100vw-1230px)/2)]">
            {banners.map(banner => (
              <Card
                key={banner.banner_name}
                className="shrink-0 w-[300px] border-none"
                role="article"
              >
                <CardContent className="p-0">
                  <img
                    src={banner.banner_image}
                    alt={`Promotional banner for ${banner.banner_name}`}
                    className="w-full h-32 object-cover rounded"
                  />
                  <h3 className="sr-only">{banner.banner_name}</h3>
                  <p className="sr-only">{banner.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
