package com.kk.dytt.model;

import java.util.List;

public class Movie {

    private String title;
    private String href;
    private String download_url;
    private String date;
    private List<String> urlArray;

    public List<String> getUrlArray() {
        return urlArray;
    }

    public void setUrlArray(List<String> urlArray) {
        this.urlArray = urlArray;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getHref() {
        return href;
    }

    public void setHref(String href) {
        this.href = href;
    }

    public String getDownload_url() {
        return download_url;
    }

    public void setDownload_url(String download_url) {
        this.download_url = download_url;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }
}
