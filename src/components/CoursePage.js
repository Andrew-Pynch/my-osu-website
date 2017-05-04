import React, { Component } from 'react';
import Helmet from 'react-helmet';
import { Link, withRouter } from 'react-router-dom';

import PageContent from './PageContent';
import '../styles/CoursePage.css';

class CoursePage extends Component {

  static propTypes = {
    match: React.PropTypes.object.isRequired
  }

  generateCalendarWeekComponent(week, key) {
    return (
      <div className="week" key={key}>
        <h3>Week {week.week}</h3>
        {week.sections.map((section, i) => (
          <div key={i}>
            <h4>{section.heading}:</h4>
            <ul>
              {section.entriesHTML.map((entryHTML, j) => (
                <li key={j} dangerouslySetInnerHTML={{ __html: entryHTML }} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  generateAssignmentComponent(assignment, key) {
    var { match } = this.props;
    var matchURLWithSlash = match.url.replace(/\/$/, '') + '/';

    var assignmentLinkComponent = null;
    if (assignment.link) {
      assignmentLinkComponent = <a href={assignment.link}>{assignment.title}</a>;
    } else if (assignment.subPage) {
      assignmentLinkComponent = (
        <Link to={matchURLWithSlash + assignment.subPage}>{assignment.title}</Link>
      );
    } else {
      assignmentLinkComponent = assignment.title;
    }

    var assignmentNotesComponent = null;
    if (assignment.notesHTML) {
      assignmentNotesComponent = (
        <ul>
          {assignment.notesHTML.map((noteHTML, i) => (
            <li key={i} dangerouslySetInnerHTML={{ __html: noteHTML }} />
          ))}
        </ul>
      );
    }

    return (
      <li key={key}>
        {assignmentLinkComponent}
        {assignmentNotesComponent}
      </li>
    );
  }

  generateEssentialsRowComponent(item, key) {
    var { match } = this.props;
    var matchURLWithSlash = match.url.replace(/\/$/, '') + '/';
    var valueTDComponent;
    if (item.infoHTML) {
      valueTDComponent = <td dangerouslySetInnerHTML={{ __html: item.infoHTML }} />;
    } else if (item.infoSubPage && item.infoText) {
      valueTDComponent = (
        <td><Link to={matchURLWithSlash + item.infoSubPage}>{item.infoText}</Link></td>
      );
    } else {
      valueTDComponent = <td></td>;
    }
    return (
      <tr key={key}>
        <td className="category">{item.title}</td>
        {valueTDComponent}
      </tr>
    );
  }

  render() {

    var { number, title, term, essentials, calendar, assignments, finalProject } = this.props.courseData;

    var finalProjectComponent = null;
    if (finalProject) {
      finalProjectComponent = (
        <section className="assignments">
          <a name="final-project" />
          <h2>Final Project</h2>
          <div dangerouslySetInnerHTML={{ __html: finalProject.preambleHTML }} />
          <ul>
            {finalProject.assignments.map(this.generateAssignmentComponent.bind(this))}
          </ul>
        </section>
      );
    }

    return (
      <PageContent contentClassName="course-page">
        <Helmet title={number} />
        <h1>{number} &ndash; {title}</h1>
        <h3>{term}</h3>

        <section className="info-table">
          <table>
            <tbody>
              {essentials.map(this.generateEssentialsRowComponent.bind(this))}
            </tbody>
          </table>
        </section>

        <section className="calendar">
          <h2>Course Calendar</h2>
          <div className="calendar-weeks">
            {calendar.map(this.generateCalendarWeekComponent)}
          </div>
        </section>

        <section className="assignments">
          <a name="assignments" />
          <h2>Assignments</h2>
          <div dangerouslySetInnerHTML={{ __html: assignments.preambleHTML }} />
          <ul>
            {assignments.assignments.map(this.generateAssignmentComponent.bind(this))}
          </ul>
        </section>

        {finalProjectComponent}
      </PageContent>
    );

  }
}

CoursePage = withRouter(CoursePage);

export default CoursePage;
