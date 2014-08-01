macro use {
	case {
		$macro_name $name:ident
	} => {
		letstx $modName = [makeValue('broccoli-' + #{$name}[0].token.value.replace('_', '-'), #{macro_name})];
		return #{var $name = require($modName)};
	}
}
export use;

operator (+++) 14 left { $l, $r } =>
	#{ require('broccoli-merge-trees')(Array.prototype.concat.apply([], [$l, $r])) }
export (+++);

operator (+!+) 14 left { $l, $r } =>
	#{ require('broccoli-merge-trees')(Array.prototype.concat.apply([], [$l, $r]), {overwrite: true}) }
export (+!+);

macro (->) {
	rule infix { $input_tree:expr | $f_name:ident (.) ... ( $options ... ) } => { $f_name (.) ... ( $input_tree, $options ... ) }
	rule infix { $input_tree:expr | $f_name:ident (.) ... } => { $f_name (.) ... ( $input_tree ) }
}
export (->);
