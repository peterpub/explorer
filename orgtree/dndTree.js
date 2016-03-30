(function (){
	var root ={
			"name":"root",
			"children":[{
				"name":"c1",
				"children":[{
					"name":"c2",
					"children":[{
						"name":"pz",
						"leafAttributes":[["sdf",""],["dsf","dsf"],["dsf","dsf"]]
					}]
				}]
			}]
	}

	var duration = 750;
	var rectW = 160;
	var rectH = 30;
	var	tree = d3.layout.tree().nodeSize([70, 40]);
	var	diagonal = d3.svg
		.diagonal()
		.projection(function (d) { 
			return [d.x + rectW / 2, d.y + rectH / 2]; 
		});
	var zm;
	var svg = d3
		.select("#body")
		.append("svg")
		.attr("width", $(document).width())
		.attr("height", $(document).height())
		.call(zm = d3.behavior.zoom().scaleExtent([1,3])
		.on("zoom", redraw))
		.append("g")
		.attr("transform", "translate(" + 350 + "," + 20 + ")");
	var collapse=function(d) {
	    if (d.children) {
	        d._children = d.children;
	        d._children.forEach(collapse);
	        d.children = null;
	    }
	}
	var fn_rounded = function(d){
		if(d.depth>2){
			return 0;
		}else{
			return 25;
		}
	};
	var fn_font = function (d) {
		if(d.depth<3){
			return "16px";
		}
		return "10px";
	};  
	var fn_family = function (d) {
		//if(d.depth<3){
			return "sans-serif";
		//}
		//return "monospace";
	};  
	var fn_fill = function (d) {
		if(d._children){
	  		 return "white";//"lightsteelblue";
	  	}else{
	  		return (['#5BC4DB','#4EE895','#98FF63','#E8DD4E','#FFC656','yellow','yellow','yellow'])[ d.depth];
	  	}
	};
	var fn_img = function (d) {
		console.log('thiz:');
		console.log(d);
		if(d.depth<3){
			if(d._children){
		  		 return "plus.png";//"lightsteelblue";
		  	}else{
		  		return "minus.png";
		  	}	
		}		
		return "";
	};
	var fn_height = function (d) {
	    return rectH + (!d.leafAttributes?0 : d.leafAttributes.length*rectH);
	};
	var i = 0;
	function update(source) {
	    var nodes = tree.nodes(root).reverse();
	    var links = tree.links(nodes);
	    nodes.forEach(function (d) {
	        d.y = d.depth * 180;
	    });
	    var node = svg.selectAll("g.node")
	        .data(nodes, function (d) {
	        	return d.id || (d.id = ++i);
	        });
	    node
	    	.enter()
	    	.append("g")
	        .attr("class", "node")
	        .attr("transform", function (d) {
	        	return "translate(" + source.x0 + "," + source.y0 + ")";
	        })
	        .on("click", click)    
	    node
	    	.append("rect")
	        .attr("width",rectW).attr("height", rectH)
	        .attr("stroke", "gray")
	        .attr("rx",function(d){
	        	return fn_rounded(d)
	        })
	        .attr("ry",function(d){
	        	return fn_rounded(d)
	        })
	        .attr("stroke-width", 1)
	        .style("fill", function(d){
	        	return fn_fill(d);
	        });
	    node
	    .append("svg:image")
	    .attr('x',2)
	    .attr('y',2)
	    .attr('width', 20)
	    .attr('height', 24)
	    .attr("xlink:href",function(d){console.log('wut?');return fn_img(d);})
	    var dlist;
	    node
	    	.append("text")
	        .attr("x", rectW / 2)
	        .attr("y", rectH / 2)
	        .attr("dy", ".35em")
	        .attr("text-anchor", "middle")
	        .style("font-size", function(d){return fn_font(d);})
	        .style("font-family", function(d){return fn_family(d);})
	        .text(function (d) {
	        	return d.name; 
	        })
	        
	        .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[0] ?(((d.leafAttributes[0] [ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[0] ?(((d.leafAttributes[0] [ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[1] ?(((d.leafAttributes[1] [ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[1] ?(((d.leafAttributes[1] [ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[2] ?(((d.leafAttributes[2] [ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[2] ?(((d.leafAttributes[2] [ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[3] ?(((d.leafAttributes[3] [ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[3] ?(((d.leafAttributes[3] [ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[4] ?(((d.leafAttributes[4] [ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[4] ?(((d.leafAttributes[4] [ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[5] ?(((d.leafAttributes[5] [ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[5] ?(((d.leafAttributes[5] [ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[6] ?(((d.leafAttributes[6] [ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[6] ?(((d.leafAttributes[6] [ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[7] ?(((d.leafAttributes[7] [ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[7] ?(((d.leafAttributes[7] [ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[8] ?(((d.leafAttributes[8] [ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[8] ?(((d.leafAttributes[8] [ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[9] ?(((d.leafAttributes[9] [ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[9] ?(((d.leafAttributes[9] [ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[10]?(((d.leafAttributes[10][ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[10]?(((d.leafAttributes[10][ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[11]?(((d.leafAttributes[11][ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[11]?(((d.leafAttributes[11][ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[12]?(((d.leafAttributes[12][ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[12]?(((d.leafAttributes[12][ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[13]?(((d.leafAttributes[13][ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[13]?(((d.leafAttributes[13][ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[14]?(((d.leafAttributes[14][ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[14]?(((d.leafAttributes[14][ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[15]?(((d.leafAttributes[15][ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[15]?(((d.leafAttributes[15][ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[16]?(((d.leafAttributes[16][ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[16]?(((d.leafAttributes[16][ 1])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","2.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[17]?(((d.leafAttributes[17][ 0])+'')):"");})
		    .append("tspan").attr("x","2").attr("text-anchor", "start").attr("dy","1.1em").text(function(d){return (d.leafAttributes&&d.leafAttributes[17]?(((d.leafAttributes[17][ 1])+'')):"");})
		    
	    node
	    	.transition()
	        .duration(duration)
	        .attr("transform", function (d) {
	        	return "translate(" + d.x + "," + d.y + ")";
	        })
	        .select("rect")
	        .attr("width", rectW)// function (d) {
	        .attr("height",  function(d){
	        	return fn_height(d);
	        })
	        .attr("rx",function(d){
	        	return fn_rounded(d)
	        })
	        .attr("ry",function(d){
	        	return fn_rounded(d)
	        })
	        .attr("stroke", "gray")
	        .attr("stroke-width", 1)
	        .style("fill", function(d){
	        	return fn_fill(d);
	        })
	        .select("text")
	        .style("fill-opacity", 1);
	    node
	    	.exit()
	    	.transition()
	        .duration(duration)
	        .attr("transform", function (d) {
	        	return "translate(" + source.x + "," + source.y + ")";
	        })
	        .remove()
	    	.select("rect")
	        .attr("width", rectW)
	        .attr("height", rectH)
	        .attr("stroke", "gray")
	        .attr("stroke-width", 1)
	    	.select("text");
	    var link = svg
	    	.selectAll("path.link")
	        .data(links, function (d) {
	        	return d.target.id;
	        });
	    link
	    	.enter()
	    	.insert("path", "g")
	        .attr("class", "link")
	        .attr("x", rectW / 2)
	        .attr("y", rectH / 2)
	        .attr("d", function (d) {
		        var o = {
		            x: source.x0,
		            y: source.y0
		        };
		        return diagonal({
		            source: o,
		            target: o
		        });
	        });
	    link
	    	.transition()
	        .duration(duration)
	        .attr("d", diagonal);
	    link
	    	.exit()
	    	.transition()
	        .duration(duration)
	        .attr("d", function (d) {
		        var o = {
		            x: source.x,
		            y: source.y
		        };
		        return diagonal({
		            source: o,
		            target: o
		        });
	        })
	        .remove();
	    nodes.forEach(function (d) {
	    	d.x0 = d.x;
	        d.y0 = d.y;
	    });
	}
	function click(d) {
	    if (d.children) {
	        d._children = d.children;
	        d.children = null;
	    } else {
	        d.children = d._children;
	        d._children = null;
	    }
	    update(d);
	}
	function redraw() {
	  svg.attr("transform","translate(" + d3.event.translate + ") scale(" + d3.event.scale + ")");
	}
	zm.translate([350, 20]);
	root.x0 = 0;
	root.y0 = 700;
	root.children.forEach(collapse);
	update(root);
	d3.select("#body").style("height", "800px");
})();