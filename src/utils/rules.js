import { DateTime, Interval } from 'luxon';

export default {
  obrigatorio: (v) => !!v || ('Campo obrigatório!'),
  obrigatorioArray: (v) => (!!v && v.length > 0) || ('Campo obrigatório!'),
  valorMinimo: (valor, valorMinimo, valorMinimoFormatado) => {
    if (!valor || !valorMinimo) return true;
    return valor >= valorMinimo || ('rules.valorminimo', [valorMinimoFormatado || valorMinimo]);
  },
  valorMaximo: (valor, valorMaximo, valorMaximoFormatado) => {
    if (!valor || !valorMaximo) return true;
    return valor <= valorMaximo || ('rules.valormaximo', [valorMaximoFormatado || valorMaximo]);
  },
  email: (v) => {
    if (v) {
      const pattern =
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
      return pattern.test(v) || ('E-mail inválido!');
    }
    return true;
  },
  date_valid: (v) => {
    if (!v || v.length === 0) {
      return true;
    }
    if (v.length !== 10) {
      return ('rules.datavalida');
    }
    return DateTime.fromFormat(v, 'dd/MM/yyyy').isValid || ('rules.datavalida');
  },
  date_between: (v, min, max) => {
    if (!v || v.length === 0) return true;
    const luxonMinimo = DateTime.fromISO(min);
    const luxonMaximo = DateTime.fromISO(max).endOf('day');
    const luxonCurrent = DateTime.fromFormat(v, 'dd/MM/yyyy');
    if ((min || '').length === 0 || !luxonMinimo.isValid) {
      return true;
    }
    if ((max || '').length === 0 || !luxonMaximo.isValid) {
      return true;
    }
    return (
      Interval.fromDateTimes(luxonMinimo, luxonMaximo).contains(luxonCurrent) ||
      ('rules.dataentre', [luxonMinimo.toFormat('dd/MM/yyyy'), luxonMaximo.toFormat('dd/MM/yyyy')])
    );
  },
  before: (v, maximo) => {
    if (!v || !maximo) {
      return true;
    }
    const luxonMaximo = DateTime.fromISO(maximo);
    const luxonCurrent = DateTime.fromFormat(v, 'dd/MM/yyyy');
    if ((maximo || '').length === 0 || !luxonMaximo.isValid) {
      return ('rules.maximoinvalido');
    }
    if (!v || v.length === 0 || !luxonCurrent.isValid) {
      return true;
    }
    return luxonCurrent <= luxonMaximo || ('rules.dataantes', [luxonMaximo.toFormat('dd/MM/yyyy')]);
  },
  after: (v, minimo) => {
    if (!v || !minimo) {
      return true;
    }
    const luxonMinimo = DateTime.fromISO(minimo);
    const luxonCurrent = DateTime.fromFormat(v, 'dd/MM/yyyy');
    if ((minimo || '').length === 0 || !luxonMinimo.isValid) {
      return ('rules.minimoinvalido');
    }
    if (!v || v.length === 0 || !luxonCurrent.isValid) {
      return true;
    }
    return luxonCurrent >= luxonMinimo || ('rules.datadepois', [luxonMinimo.toFormat('dd/MM/yyyy')]);
  }
};
