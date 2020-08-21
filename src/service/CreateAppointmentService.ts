import Appoiment from '../models/Appointment';
import Appointment from '../models/Appointment';
import AppointmentsRepository from '../repositories/AppointmentsRepository';
import { startOfHour } from 'date-fns';

interface RequestDTO {
  date: Date;
  provider: string;
}

class CreateAppointmentService {
  private appointmentsRepository: AppointmentsRepository;
  constructor(appointmentsRepository: AppointmentsRepository) {
    this.appointmentsRepository = appointmentsRepository;
  }

  public execute({ date, provider }: RequestDTO): Appointment {
    const appoinmentDate = startOfHour(date);

    const findAppointmentInSameDate = this.appointmentsRepository.findByDate(appoinmentDate);

    if (findAppointmentInSameDate) {
      throw Error('This appointment is already booked');
    }

    const appointment = this.appointmentsRepository.create({
      provider,
      date: appoinmentDate,
    });

    return appointment;
  }
}

export default CreateAppointmentService;
