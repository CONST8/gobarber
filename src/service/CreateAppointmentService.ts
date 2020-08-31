import { startOfHour } from 'date-fns';
import { getCustomRepository } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import User from '../models/User';
import AppError from '../errors/AppError';

interface RequestDTO {
  date: Date;
  provider_id: User;
}

class CreateAppointmentService {
  public async execute({ date, provider_id }: RequestDTO): Promise<Appointment> {
    const appointmentsRepository = getCustomRepository(AppointmentsRepository);
    const appoinmentDate = startOfHour(date);

    const findAppointmentInSameDate = await appointmentsRepository.findByDate(appoinmentDate);

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is already booked');
    }

    const appointment = appointmentsRepository.create({
      date: appoinmentDate,
      provider_id,
    });

    await appointmentsRepository.save(appointment);

    return appointment;
  }
}

export default CreateAppointmentService;
