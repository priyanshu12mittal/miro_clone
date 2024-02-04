"use client";

import React from 'react';
import { useOrganization } from '@clerk/nextjs';
import { EmptyOrg } from './_components/empty-org';
import { BoardList } from './_components/board-list';

interface DashboardPageProps {
  searchParams:{
    search?:string;
    favourites?:string;
  };
};

const DashboardPage = ({searchParams}:DashboardPageProps) => {
  const {organization} = useOrganization();
  return (
    <div className='flex-1 h-[calc(100%-80px)]'>
      {!organization ? (<EmptyOrg />):(
        <BoardList orgId={organization.id} query={searchParams} />
      )}
    </div>
  )
}

export default DashboardPage