import moment, { Moment } from "moment";

export default function getActualData(data, actualDate: Moment, lifeTime: number) {
  const format = "DD/MM/YYYY HH:mm:ss";
  if (!actualDate) return null;

  const now  = moment().format(format);
  const then = actualDate.format(format);

  const ms = moment(now, format).diff(moment(then, format));
  const duration = moment.duration(ms);
  const minutes = duration.asSeconds();
  if (minutes > lifeTime) return null
  else return data;
}