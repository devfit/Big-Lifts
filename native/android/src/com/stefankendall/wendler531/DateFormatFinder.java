package com.stefankendall.wendler531;

import android.content.Context;
import android.text.format.DateFormat;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

public class DateFormatFinder {
    Context context;

    public DateFormatFinder(Context context) {
        this.context = context;
    }

    public String getDateFormat() {
        java.text.DateFormat format = getFormatFromContext();
        try {
            return getStringFormatFromDateFormat(format);
        } catch (ParseException e) {
            e.printStackTrace();
            return null;
        }
    }

    protected String getStringFormatFromDateFormat(java.text.DateFormat format) throws ParseException {
        Date testDate = new SimpleDateFormat("MM/dd/yyyy").parse("01/02/1999");
        String formattedDate = format.format(testDate);
        formattedDate = formattedDate.replace("02", "dd");
        formattedDate = formattedDate.replace("01", "MM");
        formattedDate = formattedDate.replace("1999", "yyyy");
        return formattedDate;
    }

    protected java.text.DateFormat getFormatFromContext() {
        return DateFormat.getDateFormat(context);
    }
}
