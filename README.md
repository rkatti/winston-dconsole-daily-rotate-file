# winston-dconsole-daily-rotate-file  -- Daily Rotate log file with trace in debug mode.

## Install

<pre>
  npm install winston-dconsole-daily-rotate-file
</pre>

Or from source:

<pre>
  git clone git://github.com/rkatti/winston-dconsole-daily-rotate-file.git
</pre>

## Usage

``` js
  winston.add(require('winston-dconsole-daily-rotate-file'), options)
```

Note : this only works in debug mode to avoid performance degradation in production environments. Please, use with caution.

## Licence

Winston-Dconsole-Daily-Rotate-File is licenced under the MIT licence. 
