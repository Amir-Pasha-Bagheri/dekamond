'use client';

import dynamic from 'next/dynamic';

const DynamicDashboard = dynamic(() => import('./dashboard/page'), { ssr: false });

function Page() {
  return <DynamicDashboard />;
}

export default Page;
