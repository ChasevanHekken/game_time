var arr = [8,16,8,8];

var new_arr = [];

for(var i=0; i < arr.length; i++) {
  if (arr[i] !== null) {
    new_arr.push(arr[i])
  }
};

var previous_value = 0;

var bool_switch = false;

var newer_arr = [];

for(var i=0; i < new_arr.length; i++) {
  newer_arr.push(new_arr[i]);

  if (new_arr[i] == previous_value) {
    newer_arr.pop();
    newer_arr.pop();
    newer_arr.push(new_arr[i] * 2);
    previous_value = 0;
    bool_switch = true;
  }

  if (bool_switch == false) {
    previous_value = new_arr[i];
  }

  bool_switch = false;
};

console.log(newer_arr);
