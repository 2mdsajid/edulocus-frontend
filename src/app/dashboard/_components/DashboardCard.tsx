import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

type Props = {
    title: string;
    value: string | number;
    badgeText: string;
    className?: string;
    badgeClassName?: string;
}

const DashboardCard = (props: Props) => {
    const {title, value, badgeText, badgeClassName, className} = props
    return (
        <Card className={cn(className)}>
            <CardHeader>
                <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent>
                <p className='text-4xl font-bold'>{value}</p>
                <Badge className={cn('mt-2 font-medium', badgeClassName)}>{badgeText}</Badge>
            </CardContent>
        </Card>
    );
}

export default DashboardCard