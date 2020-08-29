import { startOfHour } from 'date-fns';
import { getCustomRepository, DeepPartial } from 'typeorm';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import User from '../models/User';

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
      throw Error('This appointment is already booked');
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
