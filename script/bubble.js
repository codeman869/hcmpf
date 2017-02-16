var height = 800,
    width = 1000,
    padding = 10,
    maxRadius = 100;

var canvas = d3.select('body').append('canvas')
            .attr('height', height)
            .attr('width', width);

var context = canvas.node().getContext('2d');

var scaleX = d3.scaleLinear().range([1,maxRadius]);

 var colors = { 
    ZFS_CREATE_POSITION: '#7fc97f',
    ZFS_REHIRE_APPR: '#beaed4',
    ZFS_NEW_HIRE_APPR: '#fdc086',
    ZFS_EXTENSION_APPR: '#ffff99',
    ZFS_REG_ACTION_APPR: '#386cb0',
    ZFS_STAT_CHG_ACTION_FULL: '#f0027f',
    ZFS_TEMP_LT_ACTION_APPR: '#bf5b17',
    ZFS_EE_WRBE_ACTION_FULL: '#666666',
    ZFS_REHIRE_FULL: '#beaed4',
    ZFS_NEW_HIRE_FULL: '#fdc086',
    ZFS_EXTENSION_FULL: '#ffff99',
    ZFS_REG_ACTION_FULL: '#386cb0',
    ZFS_STAT_CHG_ACTION_APPR: '#f0027f',
    ZFS_TEMP_LT_ACTION_FULL: '#bf5b17',
    ZFS_EE_WRBE_ACTION_APPR: '#666666',

 
      
  };

d3.json('./data/hcmpf.json', loadData);

function loadData(err,json) {
  if(err) return console.warn(err);
  
  canvas.on('mouseOver', handleMouseOver);

  var max = d3.max(json,function(d){
    //console.log(d);
    return d["Retention Time"];
  });
  
  var min = d3.min(json,function(d){ 
      return d["Retention Time"];
      
  });
  
  scaleX.domain([min,max]);
  
 
  
  var dots = [];
      
    
  var nodes = json;
    
  var force = d3.forceSimulation().nodes(nodes)
        .force('collide', d3.forceCollide()
        .radius(function(d){
            
            return scaleX(d['Retention Time'])+0.5;
            
        }))
        .force('x', d3.forceX().strength(0.001))
        .force('y', d3.forceY().strength(0.001))
        .force('center', d3.forceCenter(width/2,height/2))
        .on('tick', ticked);

    console.log(nodes);

    function ticked() {
        
        context.clearRect(0,0,width,height);
        
       // context.translate(width/2, height/2);
        
       dots = [];
       
        
        
        
        nodes.forEach(function(d){
            var r = scaleX(d['Retention Time']);
            
            context.fillStyle = colors[d['SCENARIO']];
            context.strokeStyle = "#333";
            context.beginPath();
            context.arc(d.x,d.y, r, 0, Math.PI * 2,true);
            context.fill();
            context.stroke();
            context.closePath();
            
            dots.push({
                x: d.x,
                y: d.y,
                r: r,
                rxr: r ^ 2,
                time: d['Processing Time'],
                form: d['SCENARIO'],
                steps: d['Num steps']
            });
            
        });
        
        
        
        
        
        
    }
    
    canvas.append('div').attr('id', 'legend')
    
    function handleMouseOver(e) {
        
        var x = d3.mouse()[0];
        var y = d3.mouse()[1];
        
        console.log(x,y);
        
        
    }
    
    //ticked();

 var svg = d3.select('body').append('svg').attr('width', 200).attr('height', 300);
 
 svg.append('g').attr('id','position').append('rect').attr('height', 18).attr('width', 18)
    .style('fill', colors['ZFS_CREATE_POSITION'])
   
    ;
   
    
svg.append('g').attr('id','rehire').append('rect').attr('height', 18).attr('width', 18)
    .style('fill', colors['ZFS_REHIRE_APPR']).attr('transform', 'translate(0,28)')
    .append('text').attr('transform', 'translate(50,28)').text('Rehire')
    ;
    
svg.append('g').attr('id','newhire').append('rect').attr('height', 18).attr('width', 18)
    .style('fill', colors['ZFS_NEW_HIRE_APPR']).attr('transform', 'translate(0,56)')    
    ;
    
svg.append('g').attr('id', 'extension').append('rect').attr('height', 18).attr('width', 18)
    .style('fill', colors['ZFS_EXTENSION_APPR']).attr('transform', 'translate(0,84)')    
    ;

svg.append('g').attr('id','regaction').append('rect').attr('height', 18).attr('width', 18)
    .style('fill', colors['ZFS_REG_ACTION_APPR']).attr('transform', 'translate(0,110)')    
    ;
    
svg.append('g').attr('id','status').append('rect').attr('height', 18).attr('width', 18)
    .style('fill', colors['ZFS_STAT_CHG_ACTION_FULL']).attr('transform', 'translate(0,138)')    
    ;
    
svg.append('g').attr('id','temp').append('rect').attr('height', 18).attr('width', 18)
    .style('fill', colors['ZFS_TEMP_LT_ACTION_APPR']).attr('transform', 'translate(0,166)')    
    ;  
    
svg.append('g').attr('id','wrbe').append('rect').attr('height', 18).attr('width', 18)
    .style('fill', colors['ZFS_EE_WRBE_ACTION_FULL']).attr('transform', 'translate(0,194)')    
    ; 
    
d3.select('#position').append('text').text('Create Position').attr('transform', 'translate(30,15)')
        ;    
    
d3.select('#rehire').append('text').text('Rehire').attr('transform', 'translate(30,42)')
        ;    
        
d3.select('#newhire').append('text').text('New Hire').attr('transform', 'translate(30,69)')
        ;            
        
d3.select('#extension').append('text').text('Extension').attr('transform', 'translate(30,97)')
        ;        
        
d3.select('#regaction').append('text').text('Regular Action').attr('transform', 'translate(30,125)')
        ;        
        
d3.select('#status').append('text').text('Status Change Action').attr('transform', 'translate(30,153)')
        ;                
        
d3.select('#temp').append('text').text('Temporary LT Action').attr('transform', 'translate(30,181)')
        ;      
 
 d3.select('#wrbe').append('text').text('EE to Retiree').attr('transform', 'translate(30,209)')
        ;        
        
}
