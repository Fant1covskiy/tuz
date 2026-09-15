const days = [
  { name: "Понедельник", short: "Пн", number: "01", lessons: [
    ["10:00", "10:50", "PSY21-EN-L4", "Психология", "C1.3.370L", "Лекции", "Белесова Н.А."],
    ["11:00", "11:50", "SOC21-EN-P27", "Социология", "C1.3.362", "Практические занятия", "Нурканат А.Н."]
  ]},
  { name: "Вторник", short: "Вт", number: "02", lessons: [
    ["08:00", "08:50", "ICT51-EN-P14", "Информационно-коммуникационные технологии", "C1.1.361K", "Практические занятия", "Ракым А.М."],
    ["09:00", "09:50", "ICT51-EN-P14", "Информационно-коммуникационные технологии", "C1.1.361K", "Практические занятия", "Ракым А.М."],
    ["10:00", "10:50", "PSY21-EN-P10", "Психология", "C1.3.236", "Практические занятия", "Белесова Н.А."],
    ["12:00", "12:50", "DM52-EN-L17", "Дискретная математика", "C1.1.328L", "Лекции", "Мухамбетжан М.А."],
    ["13:05", "13:55", "DM52-EN-L17", "Дискретная математика", "C1.1.328L", "Лекции", "Мухамбетжан М.А."]
  ]},
  { name: "Среда", short: "Ср", number: "03", lessons: [] },
  { name: "Четверг", short: "Чт", number: "04", lessons: [
    ["10:00", "10:50", "IP52-EN-P17", "Введение в программирование", "C1.2.239K", "Практические занятия", "Алфыс С."],
    ["11:00", "11:50", "IP52-EN-P17", "Введение в программирование", "C1.2.239K", "Практические занятия", "Алфыс С."]
  ]},
  { name: "Пятница", short: "Пт", number: "05", lessons: [
    ["08:00", "08:50", "SOC21-EN-L19", "Социология", "C1.2.237L", "Лекции", "Нурканат А.Н."],
    ["10:00", "10:50", "DM52-EN-L17", "Дискретная математика", "C1.1.328L", "Лекции", "Мухамбетжан М.А."],
    ["11:00", "11:50", "IP52-EN-P17", "Введение в программирование", "C1.2.239K", "Практические занятия", "Алфыс С."],
    ["16:00", "16:50", "F(CHINESE)L54-CH-P24", "Иностранный (китайский) язык 1 (A1)", "C1.1.326", "Практические занятия", "Есимова К.С."],
    ["17:00", "17:50", "F(CHINESE)L54-CH-P24", "Иностранный (китайский) язык 1 (A1)", "C1.1.326", "Практические занятия", "Есимова К.С."]
  ]},
  { name: "Суббота", short: "Сб", number: "06", lessons: [
    ["09:00", "09:50", "DM52-EN-P11", "Дискретная математика", "C1.2.241K", "Практические занятия", "Мухамбетжан М.А."],
    ["10:00", "10:50", "DM52-EN-P11", "Дискретная математика", "C1.2.241K", "Практические занятия", "Мухамбетжан М.А."],
    ["14:00", "14:50", "F(CHINESE)L54-CH-P24", "Иностранный (китайский) язык 1 (A1)", "C1.1.326", "Практические занятия", "Есимова К.С."]
  ]},
  { name: "Воскресенье", short: "Вс", number: "07", lessons: [] }
];

const picker = document.querySelector("#dayPicker");
const schedule = document.querySelector("#schedule");
const selectedDay = document.querySelector("#selectedDay");
function renderPicker() {
  picker.innerHTML = days.map((day, index) => `<button class="day-button" data-day="${index}" aria-label="${day.name}">${day.short}</button>`).join("");
  picker.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (button) renderDay(Number(button.dataset.day));
  });
}

function renderDay(index) {
  const day = days[index];
  document.querySelectorAll(".day-button").forEach((button, buttonIndex) => button.classList.toggle("active", buttonIndex === index));
  selectedDay.textContent = day.name;
  if (!day.lessons.length) {
    schedule.innerHTML = '<div class="empty">Занятий нет</div>';
    return;
  }
  schedule.innerHTML = day.lessons.map((lesson, lessonIndex) => {
    const [start, end, code, subject, room, type, teacher, online] = lesson;
    return `<article class="lesson ${online ? "online" : ""}" style="animation-delay:${lessonIndex * 45}ms"><div class="time">${start}<small>${end}</small></div><div class="lesson-card"><div class="code">${code}</div><div class="subject">${subject}</div>${online ? '<div class="online-label">Онлайн</div>' : ""}<div class="details">${room ? `<span class="detail"><span class="icon">⌖</span>${room}</span>` : ""}<span class="detail"><span class="icon">▧</span>${type}</span><span class="detail"><span class="icon">◌</span>${teacher}</span></div></div></article>`;
  }).join("");
}

renderPicker();
const currentDay = (new Date().getDay() + 6) % 7;
renderDay(currentDay);