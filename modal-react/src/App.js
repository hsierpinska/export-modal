
import { useState } from "react";

const Create = () => {
  const [report, setReport] = useState('');
  const [format, setFormat] = useState('Excel');
  const [mail, setMail] = useState('');
  const [schedule, setSchedule] = useState("No Repeat");
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [message, setMessage] = useState('');
  const [weekday, setWeekday] = useState('');

  let handleSubmit = async (e) => {

    e.preventDefault();
    try {

      let _csrfToken = null;

      async function getCsrfToken() {
        if (_csrfToken === null) {
          const response = await fetch("http://localhost:8000/csrf/", {
            credentials: 'include',
          });
          const data = await response.json();
          _csrfToken = data.csrfToken;
        }
        return _csrfToken;
      }


      var csrftoken = await getCsrfToken();
      var headers = new Headers();
      headers.append('Content-Type', 'application/json');
      headers.append('X-CSRFToken', csrftoken);
      headers.append('Accept', 'application/json');
      let postbody = {
        report: report,
        format: format,
        mail: mail,
        schedule: schedule,

      };
      switch (schedule) {
        case "No Repeat":
          break;
        case "Specific Date":
          postbody['date'] = date;
          postbody['time'] = time;
          break;
        case "Daily":
          postbody['time'] = time;
          break;
        case "Weekly":
          postbody['weekday'] = weekday;
          break;

      }

      let api = "http://localhost:8000/report/";
      let json_postbody = JSON.stringify(postbody);
      var responseClone;
      let res = await fetch(api, {
        method: "POST",
        body: json_postbody,
        headers: headers,
      });
      

      let resJson = await res.json();
      if (res.status === 201) {
        setReport("");
        setFormat("");
        setSchedule("");
        setMail("");

        if (postbody.hasOwnProperty('date')) {
          setDate("");
        } else if (postbody.hasOwnProperty('time')) {
          setTime("");
        }
        else if (postbody.hasOwnProperty('weekday')) {
          setWeekday("");
        }

        setMessage("Created successfully");
        console.log(json_postbody);

      } else {
        setMessage("Some error occured");
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (

    <div className="create">
      <form onSubmit={handleSubmit}>
        <h1>Export group</h1>
        <label>Report name</label>
        <input
          type="text"
          required
          placeholder="Shareablee Report"
          value={report}
          onChange={(e) => setReport(e.target.value)}
        /><br></br>
        <label>Format</label>
        <label>
          <input
            type="radio"
            required
            value="Excel"
            checked={format === 'Excel'}
            onChange={(e) => setFormat(e.target.value)}
          />
          Excel
        </label>
        <label>
          <input
            type="radio"
            required
            value="CSV"
            checked={format === 'CSV'}
            onChange={(e) => setFormat(e.target.value)}
          />
          CSV
        </label>
        <br></br>
        <label>E-mail to</label>
        <input
          type="email"
          required
          value={mail}
          placeholder="client@company.com"
          onChange={(e) => setMail(e.target.value)}
        />
        <br></br>
        <label>Schedule</label>
        <label>
          <input
            type="radio"
            required
            value="No Repeat"
            checked={schedule === 'No Repeat'}
            onChange={(e) => { setSchedule(e.target.value) }}
          />
          No Repeat
        </label>
        <label>

          <input
            type="radio"
            value="Specific Date"
            checked={schedule === 'Specific Date'}
            onChange={(e) => { setSchedule(e.target.value) }}
          

          />

          Specific Date
        </label>
        <label>
          <input
            type="radio"
            value="Daily"
            checked={schedule === 'Daily'}
            onChange={(e) => { setSchedule(e.target.value) }}
          />
          Daily
        </label>
        <label>
          <input
            type="radio"
            value="Weekly"
            checked={schedule === 'Weekly'}
            onChange={(e) => { setSchedule(e.target.value) }}
          />Weekly
        </label><br></br>

        {schedule === "Specific Date" &&
          <div>
            <label>Date</label>
            <input
              type="date"
              required
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
            <span>at</span>

            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <br></br>
          </div>
        }
        {schedule === "Daily" &&
          <div>
            <label>Everyday at</label>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <br></br>
          </div>}
        {schedule === "Weekly" &&
          <div>
            <label>Every</label>
            <select
              name="weekday"
              value={weekday}
              onChange={(e) => setWeekday(e.target.value)}
            >
              <option value="Monday">Monday</option>
              <option value="Tuesday">Tuesday</option>
              <option value="Wednesday">Wednesday</option>
              <option value="Thursday">Thursday</option>
              <option value="Friday">Friday</option>
              <option value="Saturday">Saturday</option>
              <option value="Sunday">Sunday</option>
            </select>
            <span>at</span>
            <input
              type="time"
              required
              value={time}
              onChange={(e) => setTime(e.target.value)}
            />
            <br></br>
          </div>
        }
        <br></br>

        <button type="submit">Submit</button>
        <div className="message">{message ? <p>{message}</p> : null}</div>

      </form>
    </div>



  );
}

export default Create;