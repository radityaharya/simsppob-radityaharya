import { Card, CardContent } from '@/components/ui/card';
import { useSelector } from 'react-redux';
import { RootState } from '@/store/reducers/store';
import { BalanceCard } from '@/components/BalanceCard';
import { UserWelcome } from '@/components/UserWelcome';
import { Link } from 'react-router-dom';

function ServicesGridSkeleton() {
  return (
    <div className="flex flex-wrap justify-between gap-4 sm:gap-2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="flex flex-col items-center sm:basis-[calc(8.33%-8px)]"
          role="presentation"
        >
          <div className="size-16 bg-gray-200 rounded-lg animate-pulse" />
          <div className="mt-2 h-3 w-16 sm:w-20 bg-gray-200 rounded animate-pulse" />
        </div>
      ))}
    </div>
  );
}

function BannersSkeleton() {
  return (
    <div className="flex gap-4">
      {Array.from({ length: 5 }).map((_, i) => (
        <div
          key={i}
          className="shrink-0 w-[300px] h-32 bg-gray-200 rounded animate-pulse"
          role="presentation"
        />
      ))}
    </div>
  );
}

export default function HomePage() {
  const {
    services,
    banners,
    loading: informationLoading,
  } = useSelector((state: RootState) => state.information);

  return (
    <div className="max-w-screen overflow-x-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex flex-col sm:flex-row justify-start sm:justify-between items-stretch gap-4 mb-8 sm:mb-16">
          <section className="w-full sm:w-2/5" aria-label="User Profile">
            <UserWelcome />
          </section>

          <section className="w-full sm:w-3/5" aria-label="Balance Information">
            <BalanceCard />
          </section>
        </div>

        <section className="mb-8 sm:mb-16 px-4 sm:px-0" aria-label="Available Services">
          <h2 className="sr-only">Layanan Tersedia</h2>
          {informationLoading ? (
            <ServicesGridSkeleton />
          ) : (
            <div className="flex flex-wrap justify-between gap-4 sm:gap-2">
              {services.map(service => (
                <Link
                  key={service.service_code}
                  to={`/services/${service.service_code.toLowerCase()}`}
                  className="flex flex-col items-center sm:basis-[calc(8.33%-8px)] hover:opacity-80 transition-opacity"
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
                </Link>
              ))}
            </div>
          )}
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
          <div className="flex gap-4 px-4 sm:px-[calc((100vw-1230px)/2)]">
            {informationLoading ? (
              <BannersSkeleton />
            ) : (
              banners.map(banner => (
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
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
