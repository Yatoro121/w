import React, { useEffect, useMemo, useState } from "react";
import { createRoot } from "react-dom/client";
import "./styles.css";



const MONTHS = [
  { key: "09-2026", title: "Сентябрь", year: 2026, month: 8, days: 30 },
  { key: "10-2026", title: "Октябрь", year: 2026, month: 9, days: 31 },
  { key: "11-2026", title: "Ноябрь", year: 2026, month: 10, days: 30 },
  { key: "12-2026", title: "Декабрь", year: 2026, month: 11, days: 31 },

  { key: "01-2027", title: "Январь", year: 2027, month: 0, days: 31 },
  { key: "02-2027", title: "Февраль", year: 2027, month: 1, days: 28 },
  { key: "03-2027", title: "Март", year: 2027, month: 2, days: 31 },
  { key: "04-2027", title: "Апрель", year: 2027, month: 3, days: 30 },
  { key: "05-2027", title: "Май", year: 2027, month: 4, days: 31 },
  { key: "06-2027", title: "Июнь", year: 2027, month: 5, days: 30 },
  { key: "07-2027", title: "Июль", year: 2027, month: 6, days: 31 },
  { key: "08-2027", title: "Август", year: 2027, month: 7, days: 31 }
];



const SUBJECTS = [
  "Математика",
  "Физика",
  "Информатика",
  "Русский язык",
  "История",
  "Таджикский язык"
];



const STATUS_OPTIONS = [
  "Н",
  "НБ",
  "Б",
  "ОТ",
  "УП"
];



const INITIAL_STUDENTS = [
  {
    id: 1,
    name: "Ахмедов Мухаммад",
    group: "ИВТ-101",
    birth: "2008-04-12",
    avatar: "АМ"
  },
  {
    id: 2,
    name: "Каримова Мадина",
    group: "ИВТ-101",
    birth: "2008-08-21",
    avatar: "КМ"
  },
  {
    id: 3,
    name: "Рахмонов Фируз",
    group: "ИВТ-101",
    birth: "2007-11-05",
    avatar: "РФ"
  },
  {
    id: 4,
    name: "Саидова Зухро",
    group: "ИВТ-101",
    birth: "2008-02-17",
    avatar: "СЗ"
  },
  {
    id: 5,
    name: "Назаров Рустам",
    group: "ИВТ-101",
    birth: "2007-09-30",
    avatar: "НР"
  },
  {
    id: 6,
    name: "Шарипова Малика",
    group: "ИВТ-101",
    birth: "2008-01-14",
    avatar: "ШМ"
  },
  {
    id: 7,
    name: "Юсуфов Сино",
    group: "ИВТ-101",
    birth: "2007-06-28",
    avatar: "ЮС"
  },
  {
    id: 8,
    name: "Абдуллоев Самир",
    group: "ИВТ-101",
    birth: "2008-03-09",
    avatar: "АС"
  },
  {
    id: 9,
    name: "Холматова Мехринисо",
    group: "ИВТ-101",
    birth: "2008-10-19",
    avatar: "ХМ"
  },
  {
    id: 10,
    name: "Давлатов Парвиз",
    group: "ИВТ-101",
    birth: "2007-12-01",
    avatar: "ДП"
  },
  {
    id: 11,
    name: "Ибрагимов Фаррух",
    group: "ИВТ-101",
    birth: "2008-05-16",
    avatar: "ИФ"
  },
  {
    id: 12,
    name: "Мирзоева Шахноза",
    group: "ИВТ-101",
    birth: "2008-07-23",
    avatar: "МШ"
  },
  {
    id: 13,
    name: "Сафаров Далер",
    group: "ИВТ-101",
    birth: "2007-10-11",
    avatar: "СД"
  },
  {
    id: 14,
    name: "Нурова Фарида",
    group: "ИВТ-101",
    birth: "2008-06-04",
    avatar: "НФ"
  },
  {
    id: 15,
    name: "Хакимов Бехруз",
    group: "ИВТ-101",
    birth: "2007-08-27",
    avatar: "ХБ"
  },
  {
    id: 16,
    name: "Рахимова Манижа",
    group: "ИВТ-101",
    birth: "2008-11-15",
    avatar: "РМ"
  },
  {
    id: 17,
    name: "Каримов Азиз",
    group: "ИВТ-101",
    birth: "2008-09-07",
    avatar: "КА"
  },
  {
    id: 18,
    name: "Файзиева Сабина",
    group: "ИВТ-101",
    birth: "2008-12-20",
    avatar: "ФС"
  }
];

/* =========================
   LOCAL STORAGE
========================= */

function load(key, fallback) {
  try {
    const value = localStorage.getItem(key);

    if (value === null) {
      return fallback;
    }

    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function save(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}

/* =========================
   ВСПОМОГАТЕЛЬНЫЕ ФУНКЦИИ
========================= */

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .map(word => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

function getMonth(key) {
  return MONTHS.find(month => month.key === key);
}

function getCellKey(month, day, studentId, subject) {
  return `${month}_${day}_${studentId}_${subject}`;
}

function getAverage(values) {
  const grades = values
    .map(Number)
    .filter(value => value >= 1 && value <= 5);

  if (grades.length === 0) {
    return "—";
  }

  const total = grades.reduce(
    (sum, grade) => sum + grade,
    0
  );

  return (total / grades.length).toFixed(2);
}

function getMarkClass(value) {
  if (value === "Н") return "n";
  if (value === "НБ") return "nb";
  if (value === "Б") return "b";
  if (value === "ОТ") return "ot";
  if (value === "УП") return "up";

  return "grade";
}

/* =========================
   APP
========================= */

function App() {
  const [students, setStudents] = useState(() =>
    load("journal_students", INITIAL_STUDENTS)
  );

  const [marks, setMarks] = useState(() =>
    load("journal_marks", {})
  );

  const [comments, setComments] = useState(() =>
    load("journal_comments", {})
  );

  const [profile, setProfile] = useState(() =>
    load("journal_profile", {
      teacher: "Преподаватель",
      college: "Государственный колледж",
      group: "ИВТ-101",
      year: "2026 / 2027",
      avatar: "П"
    })
  );

  const [dark, setDark] = useState(() =>
    load("journal_dark", false)
  );

  const [month, setMonth] = useState(() =>
    load("journal_month", "09-2026")
  );

  const [subject, setSubject] = useState(() =>
    load("journal_subject", "Математика")
  );

  const [year, setYear] = useState(() =>
    load("journal_year", 2026)
  );

  const [page, setPage] = useState("journal");

  const [selectedStudent, setSelectedStudent] = useState(
    students[0]?.id ?? null
  );

  const [selectedCell, setSelectedCell] = useState(null);

  const [search, setSearch] = useState("");

  const [showAdd, setShowAdd] = useState(false);

  const [newStudent, setNewStudent] = useState({
    name: "",
    group: "ИВТ-101",
    birth: ""
  });

  /* =========================
     СОХРАНЕНИЕ
  ========================= */

  useEffect(() => {
    save("journal_students", students);
  }, [students]);

  useEffect(() => {
    save("journal_marks", marks);
  }, [marks]);

  useEffect(() => {
    save("journal_comments", comments);
  }, [comments]);

  useEffect(() => {
    save("journal_profile", profile);
  }, [profile]);

  useEffect(() => {
    save("journal_dark", dark);
  }, [dark]);

  useEffect(() => {
    save("journal_month", month);
  }, [month]);

  useEffect(() => {
    save("journal_subject", subject);
  }, [subject]);

  useEffect(() => {
    save("journal_year", year);
  }, [year]);

  /* =========================
     ДАННЫЕ
  ========================= */

  const currentMonth = getMonth(month);

  const filteredStudents = students.filter(student =>
    student.name
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  const currentYearMonths = MONTHS.filter(
    item => item.year === year
  );

  const allValues = Object.values(marks);

  const gradeCount = allValues.filter(value =>
    ["1", "2", "3", "4", "5"].includes(String(value))
  ).length;

  const nbCount = allValues.filter(
    value => value === "НБ"
  ).length;

  const absentCount = allValues.filter(
    value => value === "Н"
  ).length;

  const avg = getAverage(allValues);

  const studentStats = useMemo(() => {
    if (!selectedStudent) {
      return {
        avg: "—",
        grades: 0,
        n: 0,
        nb: 0,
        b: 0
      };
    }

    const values = Object.entries(marks)
      .filter(([key]) =>
        key.includes(`_${selectedStudent}_`)
      )
      .map(([, value]) => value);

    return {
      avg: getAverage(values),

      grades: values.filter(value =>
        ["1", "2", "3", "4", "5"].includes(String(value))
      ).length,

      n: values.filter(value => value === "Н").length,

      nb: values.filter(value => value === "НБ").length,

      b: values.filter(value => value === "Б").length
    };
  }, [marks, selectedStudent]);

  /* =========================
     МЕСЯЦ / ГОД
  ========================= */

  function changeYear(value) {
    setYear(value);

    const firstMonth = MONTHS.find(
      item => item.year === value
    );

    if (firstMonth) {
      setMonth(firstMonth.key);
    }
  }

  function changeMonth(value) {
    setMonth(value);

    const selected = getMonth(value);

    if (selected) {
      setYear(selected.year);
    }
  }

  /* =========================
     ОЦЕНКА
  ========================= */

  function setMark(studentId, day, value) {
    const key = getCellKey(
      month,
      day,
      studentId,
      subject
    );

    setMarks(prev => {
      const next = { ...prev };

      if (value === "") {
        delete next[key];
      } else {
        next[key] = value;
      }

      return next;
    });
  }

  /* =========================
     ДОБАВЛЕНИЕ СТУДЕНТА
  ========================= */

  function addStudent(event) {
    event.preventDefault();

    if (!newStudent.name.trim()) {
      alert("Введите имя студента");
      return;
    }

    const student = {
      id: Date.now(),
      name: newStudent.name.trim(),
      group: newStudent.group || "ИВТ-101",
      birth: newStudent.birth,
      avatar: getInitials(newStudent.name)
    };

    setStudents(prev => [
      ...prev,
      student
    ]);

    setSelectedStudent(student.id);

    setNewStudent({
      name: "",
      group: "ИВТ-101",
      birth: ""
    });

    setShowAdd(false);
  }

  /* =========================
     УДАЛЕНИЕ СТУДЕНТА
  ========================= */

  function deleteStudent(id) {
    const student = students.find(
      item => item.id === id
    );

    if (!student) return;

    const confirmed = window.confirm(
      `Удалить студента "${student.name}"?`
    );

    if (!confirmed) return;

    setStudents(prev =>
      prev.filter(item => item.id !== id)
    );

    /* Удаляем оценки студента */

    setMarks(prev => {
      const next = {};

      Object.entries(prev).forEach(
        ([key, value]) => {
          if (!key.includes(`_${id}_`)) {
            next[key] = value;
          }
        }
      );

      return next;
    });

    /* Удаляем комментарии */

    setComments(prev => {
      const next = {};

      Object.entries(prev).forEach(
        ([key, value]) => {
          if (!key.includes(`_${id}_`)) {
            next[key] = value;
          }
        }
      );

      return next;
    });

    if (selectedStudent === id) {
      const nextStudent = students.find(
        item => item.id !== id
      );

      setSelectedStudent(
        nextStudent?.id ?? null
      );

      setPage("students");
    }
  }

  /* =========================
     РЕЗЕРВНАЯ КОПИЯ
  ========================= */

  function exportData() {
    const data = {
      students,
      marks,
      comments,
      profile,
      dark,
      month,
      subject,
      year,

      exportedAt:
        new Date().toISOString()
    };

    const blob = new Blob(
      [
        JSON.stringify(
          data,
          null,
          2
        )
      ],
      {
        type: "application/json"
      }
    );

    const url =
      URL.createObjectURL(blob);

    const link =
      document.createElement("a");

    link.href = url;

    link.download =
      "student-journal-2026-2027.json";

    document.body.appendChild(link);

    link.click();

    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  /* =========================
     ОЧИСТКА ОЦЕНОК
  ========================= */

  function clearData() {
    const confirmed = window.confirm(
      "Удалить все оценки и посещаемость?"
    );

    if (!confirmed) return;

    setMarks({});
    setComments({});
  }

  return (
    <div
      className={
        dark
          ? "app dark"
          : "app"
      }
    >

      {/* HEADER */}

      <header className="topbar">

        <div className="brand">

          <div className="brand-mark">
            J
          </div>

          <div>
            <b>
              Student Journal
            </b>

            <span>
              Электронный журнал
            </span>
          </div>

        </div>

        <nav className="main-nav">

          <button
            className={
              page === "journal"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("journal")
            }
          >
            Журнал
          </button>

          <button
            className={
              page === "students"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("students")
            }
          >
            Студенты
          </button>

          <button
            className={
              page === "analytics"
                ? "active"
                : ""
            }
            onClick={() =>
              setPage("analytics")
            }
          >
            Аналитика
          </button>

        </nav>

        <div className="top-actions">

          <button
            className="icon-btn"
            onClick={() =>
              setDark(value => !value)
            }
          >
            {dark ? "☀" : "◐"}
          </button>

          <button
            className="profile-mini"
            onClick={() =>
              setPage("teacher")
            }
          >

            <span className="avatar small">
              {profile.avatar}
            </span>

            <span>
              {profile.teacher}
            </span>

          </button>

        </div>

      </header>

      {/* CONTENT */}

      <main>

        {page === "journal" && (
          <JournalPage
            students={students}
            filteredStudents={
              filteredStudents
            }
            marks={marks}
            month={month}
            setMonth={changeMonth}
            year={year}
            setYear={changeYear}
            currentMonth={
              currentMonth
            }
            currentYearMonths={
              currentYearMonths
            }
            subject={subject}
            setSubject={
              setSubject
            }
            search={search}
            setSearch={setSearch}
            avg={avg}
            nbCount={nbCount}
            absentCount={
              absentCount
            }
            setSelectedStudent={id => {
              setSelectedStudent(id);
              setPage("profile");
            }}
            setSelectedCell={
              setSelectedCell
            }
            exportData={exportData}
            setShowAdd={
              setShowAdd
            }
            clearData={clearData}
          />
        )}

        {page === "students" && (
          <StudentsPage
            students={students}
            search={search}
            setSearch={setSearch}
            setSelectedStudent={
              id => {
                setSelectedStudent(id);
                setPage("profile");
              }
            }
            onAdd={() =>
              setShowAdd(true)
            }
            onDelete={
              deleteStudent
            }
          />
        )}

        {page === "analytics" && (
          <AnalyticsPage
            students={students}
            marks={marks}
            gradeCount={
              gradeCount
            }
            nbCount={nbCount}
            avg={avg}
          />
        )}

        {page === "profile" && (
          <ProfilePage
            student={
              students.find(
                student =>
                  student.id ===
                  selectedStudent
              )
            }
            stats={studentStats}
            marks={marks}
            setPage={setPage}
            onDelete={
              deleteStudent
            }
          />
        )}

        {page === "teacher" && (
          <TeacherPage
            profile={profile}
            setProfile={
              setProfile
            }
            setPage={setPage}
          />
        )}

      </main>

      <footer>
        Student Journal · 2026 / 2027
      </footer>

      {/* MARK MODAL */}

      {selectedCell && (
        <MarkModal
          data={selectedCell}
          month={month}
          subject={subject}
          marks={marks}
          comments={comments}
          setMark={setMark}
          setComments={
            setComments
          }
          close={() =>
            setSelectedCell(null)
          }
        />
      )}

      {/* ADD STUDENT */}

      {showAdd && (
        <AddStudentModal
          newStudent={
            newStudent
          }
          setNewStudent={
            setNewStudent
          }
          addStudent={
            addStudent
          }
          close={() =>
            setShowAdd(false)
          }
        />
      )}

    </div>
  );
}

/* =========================
   JOURNAL
========================= */

function JournalPage({
  filteredStudents,
  marks,
  month,
  setMonth,
  year,
  setYear,
  currentMonth,
  currentYearMonths,
  subject,
  setSubject,
  search,
  setSearch,
  avg,
  nbCount,
  absentCount,
  setSelectedStudent,
  setSelectedCell,
  exportData,
  setShowAdd,
  clearData
}) {
  return (
    <section>

      <div className="page-head">

        <div>

          <p className="eyebrow">
            Учебный год
          </p>

          <h1>
            Журнал успеваемости
          </h1>

          <p className="muted">
            Оценки и посещаемость
            студентов
          </p>

        </div>

        <div className="head-actions">

          <button
            className="secondary"
            onClick={exportData}
          >
            ⇩ Резервная копия
          </button>

          <button
            className="primary"
            onClick={() =>
              setShowAdd(true)
            }
          >
            ＋ Студент
          </button>

        </div>

      </div>

      {/* ГОД */}

      <div className="year-switcher">

        <button
          className={
            year === 2026
              ? "active"
              : ""
          }
          onClick={() =>
            setYear(2026)
          }
        >
          2026
        </button>

        <div>

          <span>
            Учебный год
          </span>

          <strong>
            2026 / 2027
          </strong>

        </div>

        <button
          className={
            year === 2027
              ? "active"
              : ""
          }
          onClick={() =>
            setYear(2027)
          }
        >
          2027
        </button>

      </div>

      {/* СТАТИСТИКА */}

      <section className="stats">

        <div className="stat-card">
          <span>
            Студентов
          </span>

          <strong>
            {filteredStudents.length}
          </strong>

          <small>
            в группе
          </small>
        </div>

        <div className="stat-card">
          <span>
            Средний балл
          </span>

          <strong>
            {avg}
          </strong>

          <small>
            по журналу
          </small>
        </div>

        <div className="stat-card">
          <span>
            НБ
          </span>

          <strong>
            {nbCount}
          </strong>

          <small>
            не был
          </small>
        </div>

        <div className="stat-card">
          <span>
            Пропуски
          </span>

          <strong>
            {absentCount}
          </strong>

          <small>
            Н за период
          </small>
        </div>

      </section>

      {/* ФИЛЬТРЫ */}

      <section className="toolbar card">

        <div className="month-title">

          <b>
            {year}
          </b>

          <span>
            Выберите месяц
          </span>

        </div>

        <div className="month-tabs">

          {currentYearMonths.map(
            item => (
              <button
                key={item.key}
                className={
                  month ===
                  item.key
                    ? "selected"
                    : ""
                }
                onClick={() =>
                  setMonth(
                    item.key
                  )
                }
              >
                {item.title}
              </button>
            )
          )}

        </div>

        <div className="filters">

          <select
            value={subject}
            onChange={event =>
              setSubject(
                event.target.value
              )
            }
          >

            {SUBJECTS.map(
              item => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              )
            )}

          </select>

          <div className="search">

            <span>
              ⌕
            </span>

            <input
              value={search}
              onChange={event =>
                setSearch(
                  event.target.value
                )
              }
              placeholder="Поиск студента..."
            />

          </div>

        </div>

      </section>

      {/* ТАБЛИЦА */}

      {currentMonth && (
        <section className="journal-wrap card">

          <div className="journal-scroll">

            <table className="journal">

              <thead>

                <tr>

                  <th className="sticky left number">
                    №
                  </th>

                  <th className="sticky student-col">
                    СТУДЕНТ
                  </th>

                  {Array.from(
                    {
                      length:
                        currentMonth.days
                    },
                    (_, index) => {

                      const date =
                        new Date(
                          currentMonth.year,
                          currentMonth.month,
                          index + 1
                        );

                      const weekdays = [
                        "ВС",
                        "ПН",
                        "ВТ",
                        "СР",
                        "ЧТ",
                        "ПТ",
                        "СБ"
                      ];

                      return (
                        <th
                          key={index}
                          className="day-head"
                        >

                          {index + 1}

                          <small>
                            {
                              weekdays[
                                date.getDay()
                              ]
                            }
                          </small>

                        </th>
                      );
                    }
                  )}

                  <th className="sticky right avg-col">
                    СР.Б
                  </th>

                  <th className="sticky right result-col">
                    ИТОГ
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredStudents.map(
                  (
                    student,
                    index
                  ) => {

                    const values =
                      Array.from(
                        {
                          length:
                            currentMonth.days
                        },
                        (
                          _,
                          dayIndex
                        ) =>
                          marks[
                            getCellKey(
                              month,
                              dayIndex + 1,
                              student.id,
                              subject
                            )
                          ]
                      );

                    return (
                      <tr
                        key={
                          student.id
                        }
                      >

                        <td className="sticky left number">
                          {index + 1}
                        </td>

                        <td
                          className="sticky student-col student-name"
                          onClick={() =>
                            setSelectedStudent(
                              student.id
                            )
                          }
                        >

                          <span className="avatar">
                            {student.avatar}
                          </span>

                          <span>
                            {
                              student.name
                            }
                          </span>

                        </td>

                        {values.map(
                          (
                            value,
                            dayIndex
                          ) => (
                            <td
                              key={
                                dayIndex
                              }
                              className="mark-cell"
                              onClick={() =>
                                setSelectedCell(
                                  {
                                    student,
                                    day:
                                      dayIndex +
                                      1
                                  }
                                )
                              }
                            >

                              {value && (
                                <span
                                  className={`mark mark-${getMarkClass(
                                    value
                                  )}`}
                                >
                                  {
                                    value
                                  }
                                </span>
                              )}

                            </td>
                          )
                        )}

                        <td className="sticky right avg-cell">
                          {
                            getAverage(
                              values
                            )
                          }
                        </td>

                        <td className="sticky right result-cell">
                          {
                            getAverage(
                              values
                            )
                          }
                        </td>

                      </tr>
                    );
                  }
                )}

              </tbody>

            </table>

          </div>

          <div className="legend">

            <span>
              <i className="dot grade" />
              Оценка
            </span>

            <span>
              <i className="dot nb" />
              НБ — не был
            </span>

            <span>
              <i className="dot n" />
              Н — нет
            </span>

            <span>
              <i className="dot b" />
              Б — болел
            </span>

            <span>
              <i className="dot ot" />
              ОТ — освобождён
            </span>

            <span>
              <i className="dot up" />
              УП — практика
            </span>

          </div>

        </section>
      )}

      <div className="danger-tools">

        <button
          className="danger-outline"
          onClick={clearData}
        >
          Очистить оценки
        </button>

      </div>

    </section>
  );
}

/* =========================
   MODAL ОЦЕНКИ
========================= */

function MarkModal({
  data,
  month,
  subject,
  marks,
  comments,
  setMark,
  setComments,
  close
}) {
  const {
    student,
    day
  } = data;

  const key = getCellKey(
    month,
    day,
    student.id,
    subject
  );

  const current =
    marks[key] || "";

  const [comment, setComment] =
    useState(
      comments[key] || ""
    );

  function save() {
    setComments(prev => ({
      ...prev,
      [key]: comment
    }));

    close();
  }

  return (
    <div
      className="modal-backdrop"
      onMouseDown={close}
    >

      <div
        className="modal mark-modal"
        onMouseDown={event =>
          event.stopPropagation()
        }
      >

        <button
          className="close"
          onClick={close}
        >
          ×
        </button>

        <div className="student-modal-head">

          <span className="avatar big">
            {student.avatar}
          </span>

          <div>

            <b>
              {student.name}
            </b>

            <span>
              {subject} ·{" "}
              {getMonth(month)?.title}{" "}
              {getMonth(month)?.year}
              {" · "}
              {day}
            </span>

          </div>

        </div>

        <p className="modal-label">
          Оценка
        </p>

        <div className="choice-grid">

          {["5", "4", "3", "2", "1"].map(
            value => (
              <button
                key={value}
                className={
                  current === value
                    ? "chosen"
                    : ""
                }
                onClick={() =>
                  setMark(
                    student.id,
                    day,
                    value
                  )
                }
              >
                {value}
              </button>
            )
          )}

          <button
            className={
              current === ""
                ? "chosen"
                : ""
            }
            onClick={() =>
              setMark(
                student.id,
                day,
                ""
              )
            }
          >
            —
          </button>

        </div>

        <p className="modal-label">
          Посещаемость
        </p>

        <div className="choice-grid status">

          {STATUS_OPTIONS.map(
            value => (
              <button
                key={value}
                className={
                  current === value
                    ? "chosen"
                    : ""
                }
                onClick={() =>
                  setMark(
                    student.id,
                    day,
                    value
                  )
                }
              >
                {value}
              </button>
            )
          )}

        </div>

        <textarea
          value={comment}
          onChange={event =>
            setComment(
              event.target.value
            )
          }
          placeholder="Комментарий..."
        />

        <button
          className="primary wide"
          onClick={save}
        >
          Сохранить
        </button>

      </div>

    </div>
  );
}

/* =========================
   СТУДЕНТЫ
========================= */

function StudentsPage({
  students,
  search,
  setSearch,
  setSelectedStudent,
  onAdd,
  onDelete
}) {
  const list =
    students.filter(student =>
      student.name
        .toLowerCase()
        .includes(
          search.toLowerCase()
        )
    );

  return (
    <section>

      <div className="page-head">

        <div>

          <p className="eyebrow">
            Группа ИВТ-101
          </p>

          <h1>
            Студенты
          </h1>

          <p className="muted">
            Список студентов вашей группы.
          </p>

        </div>

        <button
          className="primary"
          onClick={onAdd}
        >
          ＋ Добавить
        </button>

      </div>

      <div className="student-toolbar card">

        <div className="search">

          <span>
            ⌕
          </span>

          <input
            value={search}
            onChange={event =>
              setSearch(
                event.target.value
              )
            }
            placeholder="Поиск студента..."
          />

        </div>

      </div>

      <div className="student-grid">

        {list.map(student => (

          <article
            className="student-card card"
            key={student.id}
          >

            <span className="avatar xl">
              {student.avatar}
            </span>

            <div className="student-card-info">

              <h3>
                {student.name}
              </h3>

              <p>
                {student.group}
              </p>

              <small>
                Дата рождения:{" "}
                {student.birth ||
                  "не указана"}
              </small>

            </div>

            <div className="student-card-actions">

              <button
                onClick={() =>
                  setSelectedStudent(
                    student.id
                  )
                }
              >
                Профиль
              </button>

              <button
                className="danger"
                onClick={() =>
                  onDelete(
                    student.id
                  )
                }
              >
                Удалить
              </button>

            </div>

          </article>

        ))}

      </div>

    </section>
  );
}

/* =========================
   ПРОФИЛЬ СТУДЕНТА
========================= */

function ProfilePage({
  student,
  stats,
  marks,
  setPage,
  onDelete
}) {
  if (!student) {
    return (
      <section className="empty">

        <h2>
          Студент не выбран
        </h2>

        <button
          className="primary"
          onClick={() =>
            setPage("students")
          }
        >
          Открыть студентов
        </button>

      </section>
    );
  }

  const recent =
    Object.entries(marks)
      .filter(([key]) =>
        key.includes(
          `_${student.id}_`
        )
      )
      .slice(-10);

  return (
    <section>

      <div className="profile-cover">

        <div className="profile-main">

          <span className="avatar profile-avatar">
            {student.avatar}
          </span>

          <div>

            <p className="eyebrow">
              Профиль студента
            </p>

            <h1>
              {student.name}
            </h1>

            <p>
              {student.group}
              {" · "}
              1 курс
            </p>

          </div>

        </div>

        <div className="profile-actions">

          <button
            className="secondary"
            onClick={() =>
              setPage("students")
            }
          >
            ← Назад
          </button>

          <button
            className="danger-btn"
            onClick={() =>
              onDelete(
                student.id
              )
            }
          >
            Удалить
          </button>

        </div>

      </div>

      <div className="profile-grid">

        <div className="card profile-info">

          <h2>
            Личные данные
          </h2>

          <div className="info-row">
            <span>ФИО</span>
            <b>{student.name}</b>
          </div>

          <div className="info-row">
            <span>Группа</span>
            <b>{student.group}</b>
          </div>

          <div className="info-row">
            <span>Дата рождения</span>
            <b>
              {student.birth || "—"}
            </b>
          </div>

          <div className="info-row">
            <span>Статус</span>
            <b className="success">
              Активный
            </b>
          </div>

        </div>

        <div className="profile-stat-grid">

          <div className="card">
            <span>
              Средний балл
            </span>

            <strong>
              {stats.avg}
            </strong>
          </div>

          <div className="card">
            <span>
              Оценок
            </span>

            <strong>
              {stats.grades}
            </strong>
          </div>

          <div className="card">
            <span>Н</span>

            <strong>
              {stats.n}
            </strong>
          </div>

          <div className="card">
            <span>НБ</span>

            <strong>
              {stats.nb}
            </strong>
          </div>

        </div>

      </div>

      <div className="card recent">

        <h2>
          Последние записи
        </h2>

        {recent.length ? (
          recent.map(
            ([key, value]) => (
              <div
                className="recent-row"
                key={key}
              >
                <span>
                  {key}
                </span>

                <b>
                  {value}
                </b>
              </div>
            )
          )
        ) : (
          <p className="muted">
            Пока нет записей.
          </p>
        )}

      </div>

    </section>
  );
}

/* =========================
   АНАЛИТИКА
========================= */

function AnalyticsPage({
  students,
  marks,
  gradeCount,
  nbCount,
  avg
}) {
  const grades =
    Object.values(marks).filter(
      value =>
        ["1", "2", "3", "4", "5"]
          .includes(
            String(value)
          )
    );

  const distribution =
    [1, 2, 3, 4, 5].map(
      grade =>
        grades.filter(
          value =>
            Number(value) ===
            grade
        ).length
    );

  const max = Math.max(
    ...distribution,
    1
  );

  return (
    <section>

      <div className="page-head">

        <div>

          <p className="eyebrow">
            2026 / 2027
          </p>

          <h1>
            Аналитика
          </h1>

          <p className="muted">
            Статистика успеваемости группы.
          </p>

        </div>

      </div>

      <div className="stats">

        <div className="stat-card">
          <span>
            Средний балл
          </span>

          <strong>
            {avg}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Оценок
          </span>

          <strong>
            {gradeCount}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            НБ
          </span>

          <strong>
            {nbCount}
          </strong>
        </div>

        <div className="stat-card">
          <span>
            Студентов
          </span>

          <strong>
            {students.length}
          </strong>
        </div>

      </div>

      <div className="analytics-grid">

        <div className="card chart">

          <h2>
            Распределение оценок
          </h2>

          <div className="bars">

            {distribution.map(
              (number, index) => (

                <div
                  className="bar-item"
                  key={index}
                >

                  <div className="bar-track">

                    <div
                      className="bar"
                      style={{
                        height:
                          `${(number / max) * 100}%`
                      }}
                    />

                  </div>

                  <b>
                    {index + 1}
                  </b>

                  <small>
                    {number}
                  </small>

                </div>

              )
            )}

          </div>

        </div>

        <div className="card tips">

          <h2>
            Обозначения
          </h2>

          <p>
            Н — нет на занятии
          </p>

          <p>
            НБ — не был
          </p>

          <p>
            Б — болел
          </p>

          <p>
            ОТ — освобождён
          </p>

          <p>
            УП — учебная практика
          </p>

        </div>

      </div>

    </section>
  );
}

/* =========================
   ПРЕПОДАВАТЕЛЬ
========================= */

function TeacherPage({
  profile,
  setProfile,
  setPage
}) {
  return (
    <section>

      <div className="page-head">

        <div>

          <p className="eyebrow">
            Настройки
          </p>

          <h1>
            Профиль преподавателя
          </h1>

        </div>

        <button
          className="secondary"
          onClick={() =>
            setPage("journal")
          }
        >
          ← Назад
        </button>

      </div>

      <div className="teacher-settings card">

        <div className="teacher-avatar">
          {profile.avatar}
        </div>

        <label>
          Имя преподавателя

          <input
            value={profile.teacher}
            onChange={event =>
              setProfile({
                ...profile,
                teacher:
                  event.target.value
              })
            }
          />

        </label>

        <label>
          Колледж

          <input
            value={profile.college}
            onChange={event =>
              setProfile({
                ...profile,
                college:
                  event.target.value
              })
            }
          />

        </label>

        <label>
          Группа

          <input
            value={profile.group}
            onChange={event =>
              setProfile({
                ...profile,
                group:
                  event.target.value
              })
            }
          />

        </label>

        <label>
          Учебный год

          <input
            value={profile.year}
            onChange={event =>
              setProfile({
                ...profile,
                year:
                  event.target.value
              })
            }
          />

        </label>

        <button
          className="primary"
          onClick={() =>
            setPage("journal")
          }
        >
          Сохранить
        </button>

      </div>

    </section>
  );
}

/* =========================
   ДОБАВЛЕНИЕ СТУДЕНТА
========================= */

function AddStudentModal({
  newStudent,
  setNewStudent,
  addStudent,
  close
}) {
  return (
    <div
      className="modal-backdrop"
      onMouseDown={close}
    >

      <form
        className="modal add-modal"
        onSubmit={addStudent}
        onMouseDown={event =>
          event.stopPropagation()
        }
      >

        <button
          type="button"
          className="close"
          onClick={close}
        >
          ×
        </button>

        <p className="eyebrow">
          Новый студент
        </p>

        <h2>
          Добавить студента
        </h2>

        <label>
          ФИО

          <input
            autoFocus
            value={
              newStudent.name
            }
            onChange={event =>
              setNewStudent({
                ...newStudent,
                name:
                  event.target.value
              })
            }
            placeholder="Например, Иванов Иван"
          />

        </label>

        <label>
          Группа

          <input
            value={
              newStudent.group
            }
            onChange={event =>
              setNewStudent({
                ...newStudent,
                group:
                  event.target.value
              })
            }
          />

        </label>

        <label>
          Дата рождения

          <input
            type="date"
            value={
              newStudent.birth
            }
            onChange={event =>
              setNewStudent({
                ...newStudent,
                birth:
                  event.target.value
              })
            }
          />

        </label>

        <button
          className="primary wide"
          type="submit"
        >
          Добавить студента
        </button>

      </form>

    </div>
  );
}

/* =========================
   START
========================= */

createRoot(
  document.getElementById("root")
).render(
  <App />
);

