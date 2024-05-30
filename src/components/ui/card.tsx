'use client';

import { useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import Button from './button-multi-purpose';

const Card = ({
  venue,
  reservation,
  onAction,
  disabled,
  actionLabel,
  actionId = '',
}) => {
  const router = useRouter();

  const handleAction = useCallback(
    (e) => {
      e.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [onAction, actionId, disabled]
  );

  const price = useMemo(() => {
    if (reservation) return reservation.totalPrice;
    return venue.price;
  }, [reservation, venue.price]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);
    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <div
      onClick={() => router.push(`/venues/${venue.id}`)}
      className="col-span-1 cursor-pointer group">
      <div className="flex flex-col gap-2 w-full rounded-3xl shadow-md p-1">
        <div className="aspect-square w-full relative overflow-hidden rounded-3xl">
          <img
            fill
            className="object-cover h-full w-full group-hover:scale-110 transition"
            src={venue.media[0]?.url || '/images/placeholder.jpg'}
            alt={venue.media[0]?.alt || 'Venue image'}
          />
        </div>
        <div className="font-semibold text-base">{venue.name}</div>
        <div className="font-medium text-sm">
          {venue.location.city}, {venue.location.country}
        </div>
        <div className="font-light text-neutral-500 text-sm">
          {reservationDate || venue.category}
        </div>
        <div className="flex flex-row items-center gap-1">
          <div className="font-semibold text-sm">${price}</div>
          {!reservation && <div className="font-light">/ night</div>}
        </div>
        {onAction && actionLabel && (
          <Button
            disabled={disabled}
            small
            label={actionLabel}
            onClick={handleAction}
          />
        )}
      </div>
    </div>
  );
};

export default Card;
