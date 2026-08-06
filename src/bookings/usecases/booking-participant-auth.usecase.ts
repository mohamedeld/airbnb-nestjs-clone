import { Injectable } from '@nestjs/common';
import { ForbiddenException } from 'src/common/errors-handling/custom-exceptions/forbidden-exception';
import { CustomI18nService } from 'src/i18n/custom-i18n.service';

@Injectable()
export class BookingParticipantAuthUseCase {
  constructor(private readonly custom18nService: CustomI18nService) {}
  checkGuestAuth(bookingGuest: string, currentUser: string) {
    if (bookingGuest !== currentUser)
      throw new ForbiddenException(
        this.custom18nService.translate('validation.BOOKING_NOT_ALLOWED'),
      );
  }

  checkHostAuth(bookingHost: string, currentUser: string) {
    if (bookingHost !== currentUser)
      throw new ForbiddenException(
        this.custom18nService.translate('validation.BOOKING_NOT_ALLOWED'),
      );
  }
}
