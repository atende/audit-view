package br.pucminas.icei.audition.audition.actions;

/**
 * Common UserActions to applications
 * @author Giovanni Silva.
 */
public enum  UserAction {
    ENABLE,
    DISABLE,
    LOGIN,
    LOGOUT;

    public static final String PREFIX = "user_";

    @Override
    public String toString(){
        return PREFIX + name().toLowerCase();
    }

}
