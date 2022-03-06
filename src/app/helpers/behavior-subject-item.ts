import { BehaviorSubject, Observable } from 'rx';

export class BehaviorSubjectItem<T> {
  readonly subject: BehaviorSubject<T>;
  readonly value$: Observable<T>;

  // Приятный бонус: так как мы используем `BehaviorSubject`, то можем получить текущее значение синхронно и без подписки.
  get value(): T {
    return this.subject.value;
  }

  set value(value: T) {
    this.subject.next(value);
  }

  constructor(initialValue: T) {
    this.subject = new BehaviorSubject(initialValue);
    this.value$ = this.subject.asObservable();
  }
}
