s2.fx.ElementMethods = {
  effect: function(element, effect, options){
    if (Object.isFunction(effect))
      effect = new effect(element, options);
    else if (Object.isString(effect))
      effect = new s2.fx[effect.capitalize()](element, options);
    effect.play(element, options);
    return element;
  },

  morph: function(element, style, options){
    options = s2.fx.parseOptions(options);
    return element.effect('morph', Object.extend(options, {style: style}));
  }.optionize(),

  appear: function(element, options){
    return element.effect('morph', Object.extend({
      before: function(){ element.show().setStyle({opacity: 0}); },
      style:  'opacity:1'
    }, options));
  },

  fade: function(element, options){
    return element.effect(Effect.Morph, Object.extend({
      style: 'opacity:0',
      after: element.hide.bind(element)
    }, options));
  },

  cloneWithoutIDs: function(element) {
    element = $(element);
    var clone = element.cloneNode(true);
    clone.id = '';
    $(clone).select('*[id]').each(function(e) { e.id = ''; });
    return clone;
  }
};

Element.addMethods(s2.fx.ElementMethods);