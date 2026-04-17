export const generateCalendarICS = (studyPlan, userData) => {
  let icsContent = "BEGIN:VCALENDAR\nVERSION:2.0\nPRODID:-//SERS//Study Schedule//EN\n";

  const startDate = new Date();
  
  // Helper to format Date purely into iCal explicitly required string format: YYYYMMDDTHHMMSSZ
  const formatDate = (date) => {
    return date.toISOString().replace(/[-:]/g, '').split('.')[0] + 'Z';
  };

  studyPlan.forEach((weekObj, index) => {
     // Schedule Week N to explicitly begin mathematically computed sequentially
     // Week 1 starts tomorrow. Week 2 starts 8 days from now...
     const eventDateStart = new Date(startDate);
     eventDateStart.setDate(eventDateStart.getDate() + (index * 7) + 1);
     
     // Set standard time block at 9:00 AM
     eventDateStart.setHours(9, 0, 0, 0); 
     
     const eventDateEnd = new Date(eventDateStart);
     // Set block duration for 2 hours
     eventDateEnd.setHours(11, 0, 0, 0); 

     const summary = `SERS Block: ${weekObj.week}`;
     const description = `Focus: ${weekObj.title}\\nDetails: ${weekObj.topics.join(', ')}`;

     icsContent += "BEGIN:VEVENT\n";
     icsContent += `DTSTART:${formatDate(eventDateStart)}\n`;
     icsContent += `DTEND:${formatDate(eventDateEnd)}\n`;
     icsContent += `SUMMARY:${summary}\n`;
     icsContent += `DESCRIPTION:${description}\n`;
     icsContent += "END:VEVENT\n";
  });

  icsContent += "END:VCALENDAR";

  // Trigger Native Blob Download
  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const url = window.URL.createObjectURL(blob);
  
  const link = document.createElement('a');
  link.href = url;
  link.download = `Study_Plan_${userData.name.replace(/\s+/g, '_')}.ics`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(url);
};
