let dummyTimelines = [
    {
        cubeId: 2,
        timeline: [
            {
                category: 'info',
                type: 'factory-done',
                time: '02/12/2019'
            },
            {
                category:'info',
                type:'shipping-domestic',
                time:'02/12/2019'
            },
            {
                category:'info',
                type:'warehouse',
                time:'02/14/2019'
            },
            {
                category:'info',
                type:'shipping-international-start',
                time:'02/15/2019'
            },
            {
                category: 'breach',
                type: 'temp-high',
                time: '02/15/2019',
                threshold:'20',
                unit:'\xB0C',
                measuredPeak:'23.2',
                measuredAvg:'22',
                duration:'22s',
                timestamp:'2019-02-16 17:07:14.727'
            },
            {
                category: 'info',
                type: 'shipping-international-end',
                time: '02/16/2019'
            }
        ]
    },
    {
        cubeId:0,
        timeline:[
            {
                category: 'info',
                type: 'transit-start',
                time: '02/16/2019'
            }
        ]
    },
    {
        cubeId:1,
        timeline:[
            {
                category: 'info',
                type: 'transit-start',
                time: '02/16/2019'
            }
        ]
    }
];

let icons = {
    'transit-start': 'fas fa-sign-out-alt',
    'transit-end': 'fas fa-sign-in-alt',
    'temp-high': 'fa fa-thermometer-full',
    'temp-low': 'fa fa-thermometer-empty',
    'accel-high': 'fas fa-arrows-alt',
    'factory-done':'fas fa-industry',
    'shipping-domestic':'fas fa-truck',
    'warehouse':'fas fa-warehouse',
    'shipping-international-start':'fas fa-plane-departure',
    'shipping-international-end':'fas fa-plane-arrival'
}

let summaryTexts = {
    'transit-start': 'Start of Transit',
    'transit-end': 'End of Transit',
    'temp-high': 'Temperature Breach',
    'temp-low': 'Temperature Breach',
    'accel-high': 'Accelerometer Breach',
    'factory-done':'Your shipment has departed the company',
    'shipping-domestic':'Your shipment is in transit (domestic)',
    'warehouse':'Your shipment has arrived at the warehouse',
    'shipping-international-start':'Your shipment is in transit (international)',
    'shipping-international-end':'Your shipment has arrived in the target country'
}

let availableCubes = [
    {
        name: 'Shipment1',
        cubes: [{
            id: 0,
            name: 'Cube01',
            status: 'ok'
        },
        {
            id: 1,
            name: 'Cube02',
            status: 'ok'
        },
        {
            id: 2,
            name: 'Cube03',
            status: 'breach'
        },
        {
            id: 3,
            name: 'Cube04',
            status: 'inactive'
        },
        {
            id: 4,
            name: 'Cube05',
            status: 'inactive'
        },
        {
            id: 5,
            name: 'Cube06',
            status: 'inactive'
        }]
    },
    {
        name: 'Shipment2',
        cubes: [
            {
                id: 6,
                name: 'VACC000001',
                status: 'inactive'
            },
            {
                id: 7,
                name: 'VACC000002',
                status: 'inactive'
            },
            {
                id: 8,
                name: 'VACC000003',
                status: 'inactive'
            }
        ]
    }

]

let selectedCubeId = 2;
let selectedCube = 'Cube03';

let selectedTimeline = [];

loadMenu();
loadDummyData();
loadTimeline();

function loadMenu() {
    let $s = $('#sidebar');
    $s.empty();
    for (let folder of availableCubes) {
        $folder = $(document.createElement('div'));
        $folder.attr('class', 'sidebar-folder');
        $folderHead = $(document.createElement('div'));
        $folderHead.attr('class', 'folder-heading');
        $i = $(document.createElement('div'));
        $i.attr('class', 'folder-icon');
        $folderHead.append($i);
        $t = $(document.createElement('div'));
        $t.attr('class', 'folder-text');
        $folderHead.append($t);
        $folder.append($folderHead);
        $folder.click(function () {

        })
        if (folderActive(folder)) {
            $i.html('<i class="fa fa-caret-down"></i>');
            $t.html(folder.name);
        } else {
            $folder.addClass('collapsed');
            $i.html('<i class="fa fa-caret-right"></i>');
            $t.html(folder.name);
        }

        for (let cube of folder.cubes) {
            let $item = $(document.createElement('div'));
            $item.attr('class', 'sidebar-item sidebar-item-' + getCubeStatus(cube));
            $item.html('<div class="item-status"><i class="fas fa-circle"></i></div>' + cube.name);
            if(cube.id==selectedCubeId){
                $item.addClass('highlighted');
            }
            $folder.append($item);
        }
        $s.append($folder);
    }
}

function loadDummyData() {
    for (let timeline of dummyTimelines) {
        if (timeline.cubeId == selectedCubeId) {
            selectedTimeline = timeline;
            return;
        }
    }
}

function loadTimeline() {
    let $t = $('#cube-monitor-timeline');
    $t.empty();
    for (let i = selectedTimeline.timeline.length - 1; i >= 0; i--) {
        let entry = selectedTimeline.timeline[i];
        let $entry = $(document.createElement('div'));
        $entry.attr('class', 'timeline-entry timeline-entry-' + entry.category);
        
        let $head = $(document.createElement('div'));
        $head.attr('class', 'timeline-heading');
        $entry.append($head);
        let $icon = $(document.createElement('div'));
        $icon.attr('class', 'timeline-entry-icon');
        $icon.append('<i class="' + icons[entry.type] + '"></i>');
        $head.append($icon);
        let $summary = $(document.createElement('div'));
        $summary.attr('class', 'timeline-entry-summary');
        $summary.html(summaryTexts[entry.type]);
        $head.append($summary);
        let $date = $(document.createElement('div'));
        $date.attr('class', 'timeline-entry-time');
        $date.html(entry.time);
        $head.append($date);
        $t.append($entry);
        if(entry.category=='breach'){
            $entry.addClass('collapsed');
            $head.css('cursor','pointer')
            let $content=$(document.createElement('div'));
            $content.attr('class','timeline-content');
            let $line1=$(document.createElement('div'));
            $line1.attr('class','timeline-entry-line');
            let $line2=$(document.createElement('div'));
            $line2.attr('class','timeline-entry-line');
            let $line3=$(document.createElement('div'));
            $line3.attr('class','timeline-entry-line');
            let $line4=$(document.createElement('div'));
            $line4.attr('class','timeline-entry-line');
            let $line5=$(document.createElement('div'));
            $line5.attr('class','timeline-entry-line');
            $line1.html('Threshold: '+entry.threshold+''+entry.unit);
            $line2.html('Measured peak value: '+entry.measuredPeak+''+entry.unit);
            $line3.html('Measured average value: '+entry.measuredAvg+entry.unit);
            $line4.html('Timestamp: '+entry.timestamp);
            $line5.html('Duration: '+entry.duration);
            $content.append($line1);
            $content.append($line2);
            $content.append($line3);
            $content.append($line4);
            $content.append($line5);
            $entry.append($content);
            $head.click(function(){
                $entry.toggleClass('collapsed');

            })
        }
        if (i > 0) {
            let $separator = $(document.createElement('div'));
            $separator.attr('class', 'timeline-separator');
            $t.append($separator);
        }
    }
}

function folderActive(folder) {
    for (let cube of folder.cubes) {
        if (cube.id == selectedCubeId) return true;
    }
    return false;
}

function getCubeStatus(cube) {
    let max=0;
    for (let timeline of dummyTimelines){
        if(timeline.cubeId==cube.id){
            for(let entry of timeline.timeline){
                if(entry.category=='breach') max=Math.max(2,max);
                if(entry.category=='info') max=Math.max(1,max);
            }
        }
    }
    switch(max){
        case 2:
            return 'problem';
        case 1:
            return 'ok';
        case 0:
            return 'inactive';
    }
}