import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '~/Layouts/Layout';
import { Button } from '~/components/ui/button';

export const NotFound: React.FC = () => {
  return (
    <div className="flex-1 flex items-center justify-center py-16">
      <div className="text-center space-y-6">
        <h1 className="text-7xl font-bold text-primary">404</h1>
        <div className="space-y-2">
          <p className="text-2xl font-semibold text-foreground">Page not found</p>
          <p className="text-muted-foreground">The page you're looking for doesn't exist.</p>
        </div>
        <Link to="/">
          <Button variant="default" size="lg" className="font-semibold">
            Back to Home
          </Button>
        </Link>
      </div>
    </div>
  );
};

const NotFoundPage: React.FC = () => {
  return (
    <Layout>
      <NotFound />
    </Layout>
  );
};

export default NotFoundPage;
