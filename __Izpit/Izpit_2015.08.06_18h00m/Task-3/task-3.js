function solve() {
    return function (selector) {
        var template = '<div class="event-calendar">' +
            '<h2 class="header">Appointments for <span class="month">{{month}}</span> <span class="year">{{year}}</span></h2>' +
            '{{#each days}}' +
            '<div class="col-date">' +
                '<div class="date">{{this.day}}</div>' +
                '<div class="events">' +
                    '{{#each events}}' +
                    '<div class="event {{this.importance}}{{#if this.title}} title=" duration: {{this.duration}}"{{/if}}">' +
                        '<div class="title">{{#if this.title}}{{this.title}}{{else}}Free slot{{/if}}</div>' +
                        '{{#if this.title}}<span class="time">at: {{this.time}}</span>{{/if}}' +
                    '</div>' +
                    '{{/each}}' +
                '</div>' +
            '</div>' +
            '{{/each }}' +
        '</div>';

        document.getElementById(selector).innerHTML = template;
    };
}

module.exports = solve;